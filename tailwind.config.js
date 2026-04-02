/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We don't necessarily toggle it now, but 'class' is good for dark mode setup
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#161D2D',
        primary: '#6366F1', // Indigo 500
        secondary: '#10B981', // Emerald 500
        danger: '#F43F5E', // Rose 500
        textBase: '#F3F4F6', // Gray 100
        textMuted: '#9CA3AF' // Gray 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
