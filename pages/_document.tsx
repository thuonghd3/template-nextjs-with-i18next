import { RenderPageResult } from 'next/dist/next-server/lib/utils';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

class MyDocument extends Document<{ lang: string }> {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<RenderPageResult & { lang: string }> {
        const initialProps = await Document.getInitialProps(ctx);
        const { query } = ctx;
        const lang =
            query && query.lang && typeof query.lang === 'string'
                ? query.lang
                : 'en';
        return {
            ...initialProps,
            lang,
        };
    }

    render(): JSX.Element {
        const { lang } = this.props;
        return (
            <Html lang={lang}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
