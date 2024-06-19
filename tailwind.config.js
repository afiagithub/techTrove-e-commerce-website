/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        play: ['"Playwrite IS"', "cursive"],
        pt: ['"PT Sans"', "sans-serif"],
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui'),],
}

