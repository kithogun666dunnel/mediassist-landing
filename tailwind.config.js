/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        navy: '#0a1628',
        blue: '#1a5fa8',
        sky: '#3b9ede',
        accent: '#00c9b1',
        pale: '#e8f4fd',
        light: '#f0f7ff',
      },
    },
  },
  plugins: [],
}
