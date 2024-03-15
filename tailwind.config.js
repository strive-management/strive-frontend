/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '1000px',
      // => @media (min-width: 640px) { ... }

      md: '2000px',
      // => @media (min-width: 768px) { ... }

      lg: '3000px',
      // => @media (min-width: 1024px) { ... }

      xl:  '4000px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '5000px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
