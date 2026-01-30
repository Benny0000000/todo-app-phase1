
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(240, 5%, 7%)',
        foreground: 'hsl(0, 0%, 98%)',
        card: 'hsl(240, 5%, 10%)',
        border: 'hsl(240, 4%, 16%)',
        primary: 'hsl(221, 83%, 53%)',
        'primary-foreground': 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}