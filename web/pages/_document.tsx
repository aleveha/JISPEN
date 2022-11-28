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
						content="Systém pro jednoduché vytváření podkladů do průběžné evidence odpadů v nemocnicích i v dalších typech zdravotnických zařízeních s možností exportu dat."
					/>
					<meta name="title" content="Průběžná evidence odpadů | JISPEN" />
					<meta name="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/static/images/og-image.png`} />
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;700&display=swap" rel="stylesheet" />
					<link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
					<link rel="manifest" href="/static/icons/site.webmanifest" crossOrigin="use-credentials" />
					<link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#140939" />
					<link rel="shortcut icon" href="/static/icons/favicon.ico" />
					<meta name="apple-mobile-web-app-title" content="JISPEN" />
					<meta name="application-name" content="JISPEN" />
					<meta name="msapplication-TileColor" content="#fff" />
					<meta name="msapplication-config" content="/static/icons/browserconfig.xml" />
					<meta name="theme-color" content="#fff" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
