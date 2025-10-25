/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ktp_red: "#BA2038",
        ktp_gray: "#161719",
        ktp_federal_blue: "#080A4F",
        ktp_black: "#01010F",
        ktp_delft_blue: "#243568",
        ktp_white: "#F5F4F2",
        ktp_blue_green: "#3B9EC5",
        ktp_yellow: "#EFCB56",
      },
    },
  },
  darkMode: "class",

  plugins: [require("tailwind-scrollbar-hide")],
};
