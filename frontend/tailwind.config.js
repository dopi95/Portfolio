/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e27',
          card: '#151b35',
          cardHover: '#1a2142',
          border: '#2d3561',
          text: '#e2e8f0',
          textSecondary: '#94a3b8',
        },
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          cardHover: '#f1f5f9',
          border: '#e2e8f0',
          text: '#1e293b',
          textSecondary: '#64748b',
        }
      }
    },
  },
  plugins: [],
}
