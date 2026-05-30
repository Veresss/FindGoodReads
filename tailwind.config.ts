/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",
      },
    },
  },
  plugins: [],
};
