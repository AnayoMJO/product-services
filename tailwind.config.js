/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // all files in app folder
    "./components/**/*.{js,ts,jsx,tsx}", // all files in components folder
    "./pages/**/*.{js,ts,jsx,tsx}",      // optional if you have pages folder
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Popping', 'sans-serif'],
        },
         gridTemplateColumns: {
            '70/30': '70% 28%',
        },
    }, // you can add custom colors, fonts, spacing, etc.
  },
  plugins: [], // add plugins here if needed (forms, typography, etc.)
};
