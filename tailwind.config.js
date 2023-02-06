/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        80: '80px',
        100: '100px'
      },
      minWidth: {
        240: '240px'
      }
    },
  },
  plugins: [],
}
