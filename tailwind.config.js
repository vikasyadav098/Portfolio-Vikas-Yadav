/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F3EDE2',
          300: '#E8DEC9',
          400: '#D5C3A3',
        },
        charcoal: {
          800: '#3D3834',
          900: '#2C2825',
          950: '#1A1816',
        },
        ochre: {
          500: '#B89269',
          600: '#9E7B56',
          700: '#836342',
          800: '#694D32',
        },
        stoneBorder: '#E5DFD5'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(44, 40, 37, 0.05), 0 2px 6px -1px rgba(44, 40, 37, 0.03)',
        'paper-hover': '0 12px 30px -4px rgba(44, 40, 37, 0.09), 0 4px 12px -2px rgba(44, 40, 37, 0.04)',
        'tear-rim': '0 8px 30px rgba(0, 0, 0, 0.18)',
      }
    },
  },
  plugins: [],
}
