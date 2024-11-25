/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-gray': '#f4f4f4',
        'dark-gray': '#2e2e2e',
      },
    },
  },
  plugins: [],
};