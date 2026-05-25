/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./*.html",
    "./pages/**/*.html",
    "./public/**/*.js",
  ],
  safelist: ["text-green-400", "text-red-400", "text-white"],
  theme: {
    extend: {
      colors: {
        navcolor: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
