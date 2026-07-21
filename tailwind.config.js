/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B2545',
        'navy-2': '#123A6B',
        'navy-deep': '#071A30',
        'navy-glow': 'rgba(18,58,107,0.35)',
        gold: '#C8A24A',
        'gold-lt': '#F1E4C3',
        'gold-dk': '#9C7B2E',
        'gray-150': '#EEF1F5',
        'gray-100': '#F5F7FA',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        sm: '0 2px 10px rgba(11,37,69,0.06)',
        md: '0 14px 36px rgba(11,37,69,0.10)',
        lg: '0 28px 70px rgba(11,37,69,0.16)',
      },
      animation: {
        float1: 'float1 12s ease-in-out infinite',
        float2: 'float2 14s ease-in-out infinite',
        bob: 'bob 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        spin: 'spin 30s linear infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 30px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(25px, -22px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGold: {
          '0%': { boxShadow: '0 0 0 0 rgba(200,162,74,0.55)' },
          '70%': { boxShadow: '0 0 0 8px rgba(200,162,74,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(200,162,74,0)' },
        },
      },
    },
  },
  plugins: [],
};
