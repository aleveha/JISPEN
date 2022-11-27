import { ThemeProvider } from "@mui/material";
import { THEME } from "@styles/theme";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Nprogress from "nprogress";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const { events } = useRouter();

	useEffect(() => {
		const onRouteChangeStart = () => Nprogress.start();
		const onRouteChangeStop = () => Nprogress.done();

		events.on("routeChangeStart", onRouteChangeStart);
		events.on("routeChangeComplete", onRouteChangeStop);
		events.on("routeChangeError", onRouteChangeStop);

		return () => {
			events.off("routeChangeStart", onRouteChangeStart);
			events.off("routeChangeComplete", onRouteChangeStop);
			events.off("routeChangeError", onRouteChangeStop);
		};
	}, [events]);

	return (
		<>
			<Head>
				<title>Průběžná evidence odpadů | JISPEN</title>
			</Head>
			<ThemeProvider theme={THEME}>
				<Component {...pageProps} />
			</ThemeProvider>
			<Toaster toastOptions={{ duration: 5000, position: "top-right" }} />
		</>
	);
}
