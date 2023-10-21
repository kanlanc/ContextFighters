/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "custom-gradient":
          "linear-gradient(180deg, #F19ED1 0%, #C997DF 15.63%, #948DF2 35.94%, #699BF7 44.79%, #B9C2FF 72.4%, #FBCEA5 99.99%, rgba(66, 107, 31, 0.00) 100%)",
      },
      fontFamily: {
        sans: ["Newsreader", "sans-serif"],
      },
    },
  },
  plugins: [],
};
