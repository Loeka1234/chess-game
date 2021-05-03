module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
      },
      height: {
        "1/8": "12.5%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
