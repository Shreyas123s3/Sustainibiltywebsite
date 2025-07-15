/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#C1F861',
        'deep-black': '#0A0A0A',
        'light-gray': '#F5F5F5',
        'hover-green': '#E6FFD6',
      },
      fontFamily: {
        'satoshi': ['DM Sans', 'Satoshi', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'draw-line': 'draw-line 2.5s ease-out',
        'slide-up': 'slideInUp 0.8s ease-out',
        'slide-left': 'slideInLeft 0.8s ease-out',
        'slide-right': 'slideInRight 0.8s ease-out',
        'fade-scale': 'fadeInScale 0.6s ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
        'rotate-glow': 'rotateGlow 8s linear infinite',
      },
      backdropBlur: {
        'custom': '12px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(193, 248, 97, 0.3)',
        'glow-intense': '0 0 30px rgba(193, 248, 97, 0.5)',
        'card-hover': '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(193, 248, 97, 0.2)',
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};