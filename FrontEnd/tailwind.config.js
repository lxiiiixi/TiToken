/** @type {import('tailwindcss').Config} */
import tailwindcssDebugScreens from 'tailwindcss-debug-screens'
import tailwindcssTypography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    debugScreens: {
      position: ['bottom', 'left'],
      style: {
        letterSpacing: '0.1rem',
      },
    },
    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {
        black: '#25282b',
        white: '#fefefe',
        button: "",
        primary1: "#95965f",
        primary2: "#5d5e55",
        tableBorder: "#686a40",
        primary: {
          400: '#FFE804'
        }
      },
    },
  },
  plugins: [
    tailwindcssDebugScreens,
    tailwindcssTypography,
  ],
  corePlugins: {
    preflight: false
  }
}

