/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#ff385c"
      },
      width: {
        'xs': '20rem', // Extra Small boyut için 20rem
        'sm': '24rem', // Small boyut için 24rem
        'md': '32rem', // Medium boyut için 32rem
        'lg': '48rem', // Large boyut için 48rem
        'xl': '64rem', // Extra Large boyut için 64rem
      },
    },
  },
  plugins: [],
}

