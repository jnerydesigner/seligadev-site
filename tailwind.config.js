/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // Cria um breakpoint personalizado chamado `se`
        se: "320px",
        // (opcional) para telas até 320px
        "max-se": { max: "320px" },
      },
      fontFamily: {
        bangers: ["var(--font-bangers)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
