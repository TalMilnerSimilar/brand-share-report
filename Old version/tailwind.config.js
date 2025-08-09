/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors from My Assets Page
        'primary-blue': '#195afe',
        'primary-blue-hover': '#1854e3',
        'primary-blue-light-hover': 'rgba(25, 90, 254, 0.1)',
        'primary-blue-light-active': 'rgba(25, 90, 254, 0.2)',
        'dark-navy': '#092540',
        'light-gray': '#e6e9ec',
        'border-gray': '#e6e9ec',
        'background-gray': '#f7f7f8',
        'text-secondary': '#6b7c8c',
        'text-dark': '#092540',
        'text-white': '#ffffff',
        'white': '#ffffff',
        'background-white': '#ffffff',
        'text-disabled': '#b6bec6',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '3px',
        'md': '6px',
        'lg': '8px',
        'xl': '18px',
        'full': '50%',
      },
      boxShadow: {
        'dropdown': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'button-outline': '0 0 0 1px #E6E9EC inset',
        'button-outline-hover': '0 0 0 1px #195AFE inset',
      },
      transitionDuration: {
        'fast': '0.2s',
        'medium': '0.3s',
      },
    },
  },
  plugins: [],
} 