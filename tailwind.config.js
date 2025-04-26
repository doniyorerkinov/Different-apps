import PrimeUI from "tailwindcss-primeui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom Colors
      colors: {
        primary: "#09111D", 
        "primary-light": "#0C1529", 
        secondary: "#49525C",
        "prime-blue": "#0946A2",
        "white": "#ffffff",
        "gray": "#B0B0B0",
        "muted-blue": "#3A5A75"
      },
      screens: {
        'mobile': '480px',
        // => @media (min-width: 480px) { ... }
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [PrimeUI],
};