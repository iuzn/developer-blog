const { boxShadow } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./pages/*.tsx",
    "./pages/**/*.tsx",
    "./components/*.tsx",
    "./components/**/*.tsx",
    "./pages/*.js",
    "./components/footer-box/*.js"
  ],
  theme: {
    extend: {
      spacing: {
        "2/3": "66.66666667%",
      },
      animation: {
        enter: "enter 200ms ease-out",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
    borderRadius: {
      default: '4px',
      'large': '24px',
},
    container: {
      padding: "1rem",
      center: true,
    },
    boxShadow: {
      ...boxShadow,
      xs: "0 2px 2px rgba(0,0,0,0.02)",
      sm: "0 4px 4px rgba(0,0,0,0.02)",
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    translate: ["hover", "focus", "group-hover"],
    opacity: ["hover", "group-hover"],
    scale: ["hover", "group-hover"],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,

  },
};
