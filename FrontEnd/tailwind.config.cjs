/** @type {import('tailwindcss').Config} */


export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {
        black: '#25282b',
        white: '#fefefe',
        button: "",
        primary1: "#95965f",
        primary2: "#5d5e55",
        tableBorder: "#686a40",
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
}

