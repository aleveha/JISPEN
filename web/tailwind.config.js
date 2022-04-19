// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

// eslint-disable-next-line no-undef
module.exports = {
	mode: "jit",
	content: ["./pages/**/*.tsx", "./src/zones/**/*.tsx", "./src/ui/**/*.tsx"],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				primary: "#1E3A8A",
				secondary: "#3B82F6",
				white: "#ffffff",
				red: "#e11d48",
				yellow: "#facc15",
				grey: "#525252",
			},
			fontFamily: {
				sans: ["'Baloo 2'", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("@tailwindcss/forms")],
};
