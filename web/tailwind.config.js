// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require("tailwindcss/defaultTheme");

const em = value => value / 16 + "em";

// eslint-disable-next-line no-undef
module.exports = {
	important: true,
	mode: "jit",
	content: ["pages/**/*.tsx", "src/pages/**/*.tsx", "src/shared/**/*.tsx", "src/zones/**/*.tsx"],
	theme: {
		screens: {
			sm: em(576),
			md: em(768),
			lg: em(992),
			xl: em(1280),
			xxl: em(1440),
		},
		extend: {
			colors: {
				"primary-dark": "#132353",
				"secondary-dark": "#085E41",
				green: "#0C8D0E",
				grey: "#535D79",
				primary: "#1E3A8A",
				red: "#C30909",
				secondary: "#10B981",
				transparent: "transparent",
			},
			flex: {
				"1-0": "1 0 auto",
			},
			fontFamily: {
				sans: ["'Baloo 2'", ...defaultTheme.fontFamily.sans],
			},
		},
	},
};
