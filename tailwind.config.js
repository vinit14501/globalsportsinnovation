/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "underline",
              fontWeight: "500",
            },
            "h1,h2,h3,h4": {
              color: "inherit",
              fontWeight: "700",
            },
          },
        },
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
