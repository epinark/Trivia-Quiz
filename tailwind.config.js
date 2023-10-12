/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': 'rgb(220, 199, 199)',
        'purple': '#e4e6f8',
        'mint': '#C4DFDF'
      },
    },
  },
  plugins: [],
}