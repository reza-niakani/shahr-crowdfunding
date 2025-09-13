/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
import colors from './src/asset/tailwind-config/js/colors';
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.js',
    './src/**/*.jsx',
    // Add paths to your CSS files here
    './src/asset/tailwind-config/css/*.css',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '580px',
      lg: '1300px'
      // xl: '1440px'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '4px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px'
    },
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #4B5563 0%, #1F2A37 100%)'
      },
      borderWidth: {
        DEFAULT: '1px'
      },
      borderRadius: {
        Radius: '15px'
      },
      boxShadow: {
        center: ' 0px 2px 5px 0px rgba(0, 0, 0, 0.15)',
        shadow1: '0px 0px 7px 0px rgba(0, 0, 0, 0.08)',
        dropShadow1: ' 0px 12px 70px 0px rgba(0, 0, 0, 0.08)',
        dropShadow2: '0px 2px 10px 0px #01B69B1A'
      },
      colors: colors,
      fontFamily: {
        Yekan: ['IRANSansX']
      },
      spacing: {
        '1/10': '10%',
        '9/10': '90%'
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
