/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scanne tous les fichiers React
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        specialGothic: ['"Special Gothic Expanded One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
