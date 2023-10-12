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
        'purple': '#EEE0C9',
        'mint': '#AED8CC',
        'red': '#A2678A'
      },
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],

}