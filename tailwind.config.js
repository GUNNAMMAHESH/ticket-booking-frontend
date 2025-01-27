/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Ensure you are matching all JavaScript and React files
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl':  '0 2px 5px rgba(215, 149, 35, 0.52), 0 -2px 5px rgba(215, 149, 35, 0.52), 2px 0 5px rgba(215, 149, 35, 0.52), -2px 0 5px rgba(215, 149, 35, 0.52)',
      },
      scale: {
        '1.1': '1.1', // custom scale 1.5x
      },

      
    },
  },
  plugins: [],
}
