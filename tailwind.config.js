/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0084FF",
        secondary: "#E4E6EB",
        accent: "#00D9A3",
        surface: "#FFFFFF",
        background: "#F0F2F5",
        success: "#00D9A3",
        warning: "#FFB800",
        error: "#FF3B30",
        info: "#0084FF"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        message: "16px",
        card: "12px",
        pill: "999px"
      },
      boxShadow: {
        card: "0 2px 4px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 8px rgba(0,0,0,0.12)",
        message: "0 1px 2px rgba(0,0,0,0.06)"
      }
    },
  },
  plugins: [],
}