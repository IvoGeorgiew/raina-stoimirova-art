/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        artist: ['"Bad Script"', 'cursive'],
      },
      // fontSize: {
      //   base: ['76px', '1.6'], // [font-size, line-height]
      // },
    },
  },
  plugins: [],
};
