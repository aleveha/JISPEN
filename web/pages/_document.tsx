import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render(): JSX.Element {
		return (
			<Html lang="cs">
				<Head>
					<meta
						name="description"
						content="Program pro pro evidenci odpadů v nemocnicích a ve zdravotnických zařízeních"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;700&display=swap"
						rel="stylesheet"
					/>
					<link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
					<link rel="manifest" href="/static/site.webmanifest" />
					<link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#3b82f6" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="theme-color" content="#ffffff" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
