/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          950: '#090d16',
          900: '#0f172a',
          850: '#162033',
          800: '#1e293b',
        },
      },
    },
  },
  plugins: [],
};
