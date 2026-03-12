/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: { 50: '#fdf3f0', 100: '#fbe4dc', 200: '#f5c4b3', 300: '#ee9e82', 400: '#e67550', 500: '#c4532e', 600: '#a33f22', 700: '#82311b', 800: '#6b2918', 900: '#5c2518' },
        teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' },
        mustard: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12' },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
