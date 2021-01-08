module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react-hooks/recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            'babel-module': {
                root: ['.'],
                extensions: ['.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@lib': './lib',
                },
            },
        },
    },
    plugins: [],
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-useless-constructor': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',

        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/camelcase': 'off',
        'camelcase': 'off',
        'import/no-cycle': 'warn',

        'jsx-a11y/label-has-associated-control': 'warn',

        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',

        // for working with immer draft assign
        // https://github.com/immerjs/immer/issues/189
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['draft'],
            },
        ],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
    },
};
