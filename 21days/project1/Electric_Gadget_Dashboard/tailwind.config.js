/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
     
    
    },
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],

}

