/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        hankeng: ["Hanken Grotesk", "sans-serif"],
        inconsolata: ["Inconsolata", "sans-serif"],
        poppins: ['Poppins', "sans-serif"],
      },
    },
    colors: {
      'background': '#eff3f0',
      'text-colour': '#121212',
      'primary': '#99c3c2',
      'secondary': '#bda887',
      'accent': '#2d4643'
    },
  },
  plugins: [],
}

