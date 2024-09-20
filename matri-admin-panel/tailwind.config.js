/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "994px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      backgroundImage: {
        "gradient-sidebarGg":
          "linear-gradient(180deg, #0F2354 0%, #0F2354 42.19%, #0F2354 96.87%);",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "navBtnBg-Color": "#ED6C0E",
        "navtext-Color": "#0F2354",
        "homeText-Color": "#0F2354",
      },
      fontFamily: {
        roboto: ["DMSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
