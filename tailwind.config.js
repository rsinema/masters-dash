/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        augusta: {
          green: "#006747",
          dark: "#004d35",
          light: "#e8f5e9",
          yellow: "#f2c94c",
          gold: "#d4af37",
          cream: "#fdf8f0",
          fairway: "#2e7d32",
        },
        score: {
          birdie: "#1b5e20",
          bogey: "#b71c1c",
          par: "#616161",
          eagle: "#006747",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
