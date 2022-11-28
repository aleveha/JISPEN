// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
	experimental: {
		outputStandalone: true,
	},
});
