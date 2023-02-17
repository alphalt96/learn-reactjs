/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        25: '25px',
        50: '50px',
        70: '70px',
        120: '120px',
        300: '300px',
        400: '400px',
        600: '600px'
      },
      height: {
        25: '25px',
        70: '70px',
        80: '80px',
        100: '100px',
        300: '300px',
        600: '600px'
      },
      minWidth: {
        240: '240px'
      }
    },
    keyframes: {
      slideDown: {
        '0%': {
          transform: 'scaleY(0%)'
        },
        '80%': {
          transform: 'scaleY(110%)'
        },
        '100%': {
          transform: 'scaleY(100%)'
        }
      },
      scrollUp: {
        '0%': {
          transform: 'scaleY(100%)'
        },
        '100%': {
          transform: 'scaleY(0%)'
        }
      },
      rotate180: {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(180deg)'
        }
      }
    },
    animation: {
      'slide-down': 'slideDown 200ms ease-in-out',
      'rotate-180': 'rotate180 350ms ease-out both',
      'scroll-up': 'scrollUp 350ms ease-out both'
    }
  },
  plugins: [],
}
