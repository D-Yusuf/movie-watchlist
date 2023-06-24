/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./main.js",
  "./public/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../images/hero.png')"
      },
      fontFamily: {
        'inter' : "'Inter', sans-serif"
      }
      
    },
  },
  plugins: [],
}

