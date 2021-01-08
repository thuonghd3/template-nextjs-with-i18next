import NextI18Next from 'next-i18next';
import path from 'path';
import config from 'next/config';

const { localeSubpaths } = config().publicRuntimeConfig || {};

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    localeSubpaths,
    localePath: path.resolve('./public/static/locales'),
    otherLanguages: ['de'],
    // fallbackLng: 'en',
});

export const {
    appWithTranslation,
    useTranslation,
    withTranslation,
    i18n,
    Router,
    Link,
} = NextI18NextInstance;

export default NextI18NextInstance;
