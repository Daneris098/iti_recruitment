/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "h-sm": { raw: "(max-height: 720px)" },
        "h-md": { raw: "(max-height: 1024px)" },
        "h-lg": { raw: "(max-height: 1280px)" },
      },
    },
  },
  plugins: [],
};
