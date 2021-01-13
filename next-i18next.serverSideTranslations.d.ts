declare module 'next-i18next/serverSideTranslations' {
    export function serverSideTranslations(
        locale: string | undefined,
        namespace: string[],
    ): any;
}
