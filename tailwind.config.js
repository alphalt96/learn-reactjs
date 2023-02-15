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
    animation: {
      fade: 'fadeOut 3s ease-in-out',
    }
  },
  plugins: [],
}
