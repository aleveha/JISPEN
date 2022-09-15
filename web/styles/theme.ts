import { createTheme, Theme } from "@mui/material";

export const THEME: Theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1280,
		},
	},
	palette: {
		primary: {
			main: "#1E3A8A",
			dark: "#132353",
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#10B981",
			dark: "#085E41",
			contrastText: "#FFF",
		},
		error: {
			main: "#C30909",
		},
		success: {
			main: "#0C8D0E",
		},
	},
	shape: {
		borderRadius: 8,
	},
	typography: {
		fontFamily: "local('Baloo-2'), sans-serif",
	},
});
