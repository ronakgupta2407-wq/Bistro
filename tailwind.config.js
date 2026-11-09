/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#1C1612',
        cream: '#F7F2EA',
        terracotta: '#B8935A',
        sage: '#8A9A7B',
        gold: '#C9A56A',
        dawn: '#FFF3E0',
        noon: '#FFF8F0',
        dusk: '#2D1B0E',
        night: '#0A0705',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
