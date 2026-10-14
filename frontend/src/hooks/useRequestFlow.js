import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  createAssistanceRequest, 
  cancelAssistanceRequest, 
  MOCK_MECHANICS 
} from '../services/mockApi';
import { useToast } from './useToast';

export function useRequestFlow() {
  const [stage, setStage] = useState('idle'); // 'idle' | 'sent' | 'finding' | 'assigned' | 'en_route' | 'cancelled'
  const [requestId, setRequestId] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null);
  const [assignedMechanic, setAssignedMechanic] = useState(null);
  const [visibleCandidates, setVisibleCandidates] = useState([]);
  const [etaRemainingSeconds, setEtaRemainingSeconds] = useState(240); // 4 min initial
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [mechanicCurrentPos, setMechanicCurrentPos] = useState(null);

  const { pushToast } = useToast();
  const timerRef = useRef(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Dispatch assistance request
  const submitRequest = useCallback(async ({ location, issue, note }) => {
    setStage('sent');
    pushToast({
      type: 'info',
      title: 'Emergency Request Dispatched',
      message: 'Broadcasting your coordinates to nearby certified mechanics...',
    });

    const res = await createAssistanceRequest({ location, issue, note });
    setRequestId(res.requestId);
    setRequestDetails({ location, issue, note });

    // Transition to Stage 2: Finding Mechanics (~2.5s)
    timerRef.current = setTimeout(() => {
      setStage('finding');
      pushToast({
        type: 'info',
        title: 'Scanning Patrol Radius (3km)',
        message: 'Locating 3 available active mobile units in your sector...',
      });
    }, 2500);
  }, [pushToast]);

  // Stage 2: Finding Mechanics - reveal avatars one by one
  useEffect(() => {
    if (stage !== 'finding') return;

    setVisibleCandidates([]);
    const t1 = setTimeout(() => setVisibleCandidates([MOCK_MECHANICS[0]]), 800);
    const t2 = setTimeout(() => setVisibleCandidates([MOCK_MECHANICS[0], MOCK_MECHANICS[1]]), 1800);
    const t3 = setTimeout(() => setVisibleCandidates(MOCK_MECHANICS), 2800);

    // Transition to Stage 3: Mechanic Assigned (~3.5s)
    const t4 = setTimeout(() => {
      const mechanic = MOCK_MECHANICS[0]; // Rahul Sharma
      setAssignedMechanic(mechanic);
      setStage('assigned');
      pushToast({
        type: 'success',
        title: 'Mechanic Matched!',
        message: `${mechanic.name} accepted your request · ETA 4 mins (${mechanic.vehicle})`,
      });
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [stage, pushToast]);

  // Stage 3: Assigned -> Transition to Stage 4: En Route (~3s)
  useEffect(() => {
    if (stage !== 'assigned') return;

    const t = setTimeout(() => {
      setStage('en_route');
      pushToast({
        type: 'warning',
        title: 'Mechanic En Route',
        message: `${assignedMechanic?.name || 'Mechanic'} has started driving to your live pin.`,
      });
    }, 3200);

    return () => clearTimeout(t);
  }, [stage, assignedMechanic, pushToast]);

  // Stage 4: En Route countdown timer and simulated GPS movement
  useEffect(() => {
    if (stage !== 'en_route') return;

    const interval = setInterval(() => {
      setEtaRemainingSeconds((prev) => {
        if (prev <= 10) return prev; // Hold near arrival
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  // Cancel action
  const confirmCancel = useCallback(async (reason) => {
    if (requestId) {
      await cancelAssistanceRequest(requestId, reason);
    }
    setStage('cancelled');
    setIsCancelModalOpen(false);
    pushToast({
      type: 'danger',
      title: 'Request Cancelled',
      message: 'Your assistance request was withdrawn. No fees charged.',
    });
  }, [requestId, pushToast]);

  const resetFlow = useCallback(() => {
    setStage('idle');
    setRequestId(null);
    setRequestDetails(null);
    setAssignedMechanic(null);
    setVisibleCandidates([]);
    setEtaRemainingSeconds(240);
  }, []);

  return {
    stage,
    requestId,
    requestDetails,
    assignedMechanic,
    visibleCandidates,
    etaRemainingSeconds,
    isCancelModalOpen,
    setIsCancelModalOpen,
    submitRequest,
    confirmCancel,
    resetFlow,
  };
}
