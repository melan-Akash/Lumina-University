/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#061638',
        'primary-container': '#1d2b4e',
        'on-primary': '#ffffff',
        secondary: '#bb0027',
        'secondary-container': '#e0283c',
        'on-secondary': '#ffffff',
        background: '#f9f9ff',
        'on-background': '#151c27',
        surface: '#f9f9ff',
        'on-surface': '#151c27',
        'surface-variant': '#dce2f3',
        'outline': '#75777f',
        admin: '#111827', // Sidebar background
        'admin-accent': '#4f46e5', // Indigo as per design md
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(29, 43, 78, 0.1), 0 2px 4px -1px rgba(29, 43, 78, 0.06)',
      }
    },
  },
  plugins: [],
}
