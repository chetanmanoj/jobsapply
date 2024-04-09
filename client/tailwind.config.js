/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#1a70eb",
      },
    },
    fontFamily: {
      navbar: ["Comfortaa", "sans-serif"],
      descp: ["Oxygen", "sans-serif"],
    },
    screens: {
      tab: "450px",
      desk: "1350px",
    },
  },
  plugins: [],
};
