// tailwind.config.js (ESM)
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
