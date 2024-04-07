/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      navbar: ["Comfortaa", "sans-serif"],
      descp: ["Oxygen", "sans-serif"],
    },
    screens: {
      tab: "450px",
      desk: "640px",
    },
  },
  plugins: [],
};
