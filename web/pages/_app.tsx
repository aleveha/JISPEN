import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>JISPEN – evidence odpadů</title>
			</Head>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
			<Toaster position="top-right" toastOptions={{ duration: 4000 }} />
		</>
	);
}
