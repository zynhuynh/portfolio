/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        surface: '#121214',
        surfaceHighlight: '#1A1A1D',
        primary: '#4F46E5',    // Indigo-600
        secondary: '#0EA5E9',  // Sky-500
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
