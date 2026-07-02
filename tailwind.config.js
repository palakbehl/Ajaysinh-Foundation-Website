/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B4F3A', // Deep Forest Green
          dark: '#083a2a',
        },
        navy: {
          DEFAULT: '#0D1B2A', // Dark Navy
        },
        cream: {
          DEFAULT: '#F7F5F2', // Soft Cream
        },
        beige: {
          DEFAULT: '#EADBC8', // Warm Beige
        },
        gold: {
          DEFAULT: '#C6A969', // Muted Gold
        },
        sage: {
          DEFAULT: '#DCE8E2', // Light Sage
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'float': '0 20px 40px -5px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
