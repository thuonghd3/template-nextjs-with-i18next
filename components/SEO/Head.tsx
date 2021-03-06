import { memo, useMemo } from 'react';
import Head from 'next/head';
import { TFunction } from 'next-i18next';

export const siteTitle = 'Viewpals - The Best YouTube Promotion Tool';
const defaultDescription =
    'With Viewpals you can increase your YouTube subscribers, views and more to give your channel a boost. Launch your first YouTube promotion today';
const defaultSep = ' | ';
const SITE_URL =
    process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.PORT || 3000}`
        : process.env.NEXT_PUBLIC_SITE_URL;

// const FACEBOOK_APP_ID = 'XXXXXXXXX';
const defaultImage = `${SITE_URL}/images/logo.png`;

export type MetaTagsProps = {
    titleDefault?: string;
    title?: string;
    description?: string;
    image?: string;
    contentType?: string;
    twitter?: string;
    noCrawl?: string;
    category?: string;
    published?: string;
    updated?: string;
    tags?: string;
    location?: Location;
    schema?: string;
    t: TFunction;
};

export default memo(({ t, title, description, ...rest }: MetaTagsProps) => {
    const titleChecked = useMemo(() => {
        if (rest.titleDefault) {
            return rest.titleDefault;
        }
        if (title) {
            return t(title) + defaultSep + siteTitle;
        }
        return siteTitle;
    }, [title, rest.titleDefault, t]);

    const desc = useMemo(() => description || defaultDescription, [
        description,
    ]);

    return (
        <Head>
            <title>{titleChecked}</title>
            <meta name="description" content={t(desc)} />
            {/* <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5"
            /> */}
            <meta
                property="og:image"
                content={rest.image ? rest.image : defaultImage}
            />
        </Head>
    );
});
