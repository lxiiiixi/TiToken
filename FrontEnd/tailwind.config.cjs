/** @type {import('tailwindcss').Config} */


export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#1a1a1a',
        white: '#fefefe',
      },
    },
  },
  plugins: [],
}

