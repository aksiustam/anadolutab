const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#344e41",
        second: "#3a5a40",
        third: "#588157",
        fourth: "#a3b18a",
        fifth: "#dad7cd",
      },
    },
  },
  plugins: [],
});
