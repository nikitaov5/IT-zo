/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./*.html",
    "./pages/**/*.html",
    "./assets/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        navcolor: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
