/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dancing-script': ['Dancing Script', 'cursive'],
        'delicious-handrawn': ['Delicious Handrawn', 'cursive'],
        'open-sans': ['Open Sans', 'sans'],
        'poppins': ['Poppins', 'sans'],
      },
      backgroundColor: {
        'custom-color': '#aab6ca',
        'purple': '#EEE0C9',
        'mint': '#AED8CC',
        'red': '#A2678A',
      },
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 0, 0.4)',
      },


    },
  },
  plugins: [],

}