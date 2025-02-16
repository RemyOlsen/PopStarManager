/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'music-green': '#1ed760',
        'music-black': '#121212'
      }
    },
  },
  plugins: [],
}