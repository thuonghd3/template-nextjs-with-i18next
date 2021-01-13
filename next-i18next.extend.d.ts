import {
    WithTranslation,
    // AppWithTranslation,
    UseTranslationResponse,
} from 'next-i18next';

declare module 'next-i18next' {
    export function withTranslation(
        ns: string | string[] | undefined,
    ): WithTranslation<string>;
    export function appWithTranslation(Component: ElementType): any;
    export function useTranslation(
        ns?: string | string[] | undefined,
    ): UseTranslationResponse;
    // export interface NextI18Next {UseTranslation
    //     withTranslation: WithTranslation;
    //     useTranslation: UseTranslation;
    //     t: TFunction;
    //     appWithTranslation: AppWithTranslation;
    // }
}
