// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'lt-yellow': '#F1C824',
        'lt-orange': '#E08A09',
        'lt-red': '#FE3C00',
        'lt-cyan': '#00C6E0',
        'lt-dark': '#132326',
        'lt-brown': '#9A7C4D',
        'lt-gray': '#ededed',
        'deep-purple': '#68219b',
        'light-purple': '#b26de1',
        'deep-blue': '#15559B',
        'light-blue': '#81B5EE',
        'dark-red': '#3B0017',
        'yellow': '#FFDE17',
        'scroll-purple': '#68219b',
        'scroll-blue': '#15559c',
        'scroll-orange': '#f97a47',
        'scroll-brown': '#7b503f',
        'text-purple': '#b26de1',
        'text-blue': '#81b5ee',
        'text-peach': '#fea887',
      },
      fontFamily: {
        'braked': ['Braked', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0,0,0,0.08)',
        'md': '0 4px 16px rgba(0,0,0,0.12)',
        'lg': '0 8px 24px rgba(0,0,0,0.16)',
        'xl': '0 16px 48px rgba(0,0,0,0.2)',
        'glow': '0 0 20px rgba(0,198,224,0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 198, 224, 0.3)' },
          '50%': { boxShadow: '0 0 0 10px rgba(0, 198, 224, 0)' },
        },
      },
    },
  },
  plugins: [],
};
