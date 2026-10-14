/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F1A',
        surface: 'rgba(30, 41, 59, 0.35)',
        'surface-hover': 'rgba(30, 41, 59, 0.55)',
        'surface-elevated': 'rgba(30, 41, 59, 0.75)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-highlight': 'rgba(255, 255, 255, 0.16)',
        primary: {
          DEFAULT: '#FF9F1C',
          dark: '#E0870F',
          light: '#FFB74D',
          contrast: '#0B0F1A',
        },
        accent: {
          DEFAULT: '#38BDF8',
          dark: '#0284C7',
          light: '#7DD3FC',
        },
        success: '#34D399',
        danger: '#F87171',
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(255, 159, 28, 0.35)',
        'glow-primary-sm': '0 0 20px rgba(255, 159, 28, 0.25)',
        'glow-accent': '0 0 32px rgba(56, 189, 248, 0.3)',
        'glow-accent-sm': '0 0 16px rgba(56, 189, 248, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'glass-hover': '0 16px 48px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
