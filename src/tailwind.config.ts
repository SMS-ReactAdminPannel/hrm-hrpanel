/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
     extend: {
      colors:{
        'primary': '#006666',
        'secondary': '#005353',
        'accent': '#004040',
        'background': '#f0f0f0',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'border-color': '#e0e0e0',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
// tailwind.config.jsit