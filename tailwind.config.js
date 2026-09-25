/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#071A2B",
        ocean: "#0D6E8A",
        champagne: "#D8B878",
        ivory: "#F7F4EE",
        coral: "#E96B4C",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}