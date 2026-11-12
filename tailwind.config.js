/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        arena: {
          bg: '#060908',
          card: '#0C1310',
          cardHover: '#121C18',
          border: 'rgba(0, 255, 135, 0.12)',
          borderHover: 'rgba(0, 255, 135, 0.4)',
          // Electric Neon Emerald & Pitch Green
          neon: '#00FF87',
          neonHover: '#22FFA0',
          volt: '#10B981',
          voltDark: '#059669',
          voltGlow: 'rgba(0, 255, 135, 0.25)',
          muted: '#8A9992',
          subtext: '#ADBDB6',
          gold: '#FFC83D',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};

