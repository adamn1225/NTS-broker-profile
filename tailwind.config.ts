import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    flowbite.content(),

  ],
  theme: {
    extend: {
      backgroundColor: {
        'button': 'var(--tw-bg-button, theme("colors.slate.700"))',
      },
      fontFamily: {
        impact: ['Impact', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'],
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        exo: ['Exo', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        staatliches: ['Staatliches', 'cursive'],
        anton: ['Anton', 'sans-serif'],
        russo: ['Russo One', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
