import { ThemeProvider } from "@mui/material";
import { THEME } from "@styles/theme";
import { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>JISPEN – evidence odpadů</title>
			</Head>
			<ThemeProvider theme={THEME}>
				<Component {...pageProps} />
			</ThemeProvider>
			<Toaster toastOptions={{ duration: 5000, position: "top-right" }} />
		</>
	);
}
