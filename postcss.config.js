export default {
  plugins: {
    '@tailwindcss/postcss': {},
    // postcss-preset-env is usually unnecessary because Tailwind already handles most modern CSS.
    autoprefixer: {
      // Define browser compatibility targets
      overrideBrowserslist: [
        "> 0.5%",
        "last 2 versions", 
        "Firefox ESR",
        "not dead",
        "Safari >= 12",
        "iOS >= 12",
      ],
    },
  },
};

