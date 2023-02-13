/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        50: '50px',
        120: '120px',
        400: '400px'
      },
      height: {
        80: '80px',
        100: '100px'
      },
      minWidth: {
        240: '240px'
      }
    },
    animation: {
      fade: 'fadeOut 3s ease-in-out',
    }
  },
  plugins: [],
}
