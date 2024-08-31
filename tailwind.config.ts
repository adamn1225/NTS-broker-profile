import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    flowbite.content(),
  ],
  theme: {
    screens: {
      'xs': '576px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'dump-bg': "url('/two_International_DumpTrucks.jpg')",
        'hero-bg': "url('https://www.heavyhaulers.com/alabama.jpg')",
        'form-bg': "url('/empty-road-bg.jpg')",
        'concrete': "url('/concrete.png')",
      },
      colors: {
        amber: {
          400: '#fbbf24',
        },
        mute: {
          200: '#e5e7eb',
        },
        'secondary-y': '#b18c2f',
      },
      backgroundColor: {
        'button': 'var(--tw-bg-button, theme("colors.slate.800"))',
      },
      fontFamily: {
        impact: ['Impact', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'],
        oswald: ['Oswald', 'sans-serif'],
        robotoSlab: ['Roboto Slab', 'serif'],
        anton: ['Anton', 'sans-serif'],
        russo: ['Russo One', 'sans-serif'],
        staatliches: ['Staatliches', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        exo: ['Exo', 'sans-serif'],
        arialBlack: ['Arial Black', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

export default config;