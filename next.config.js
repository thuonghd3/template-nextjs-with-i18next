const { nextI18NextRewrites } = require('next-i18next/rewrites');
const localeSubpaths = { en: 'en', de: 'de' };

module.exports = {
    /* config options here */
    webpack: (config, { dev }) => {
        // check eslint on build
        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                // Emit errors as warnings for dev to not break webpack build.
                // Eslint errors are shown in console for dev, yay :-)
                // emitWarning: dev,
            },
        });

        return config;
    },
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths,
    },
    // i18n: {
    //     locales: ['en', 'de'],
    //     defaultLocale: 'en',
    // },
};
