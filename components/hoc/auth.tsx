import { NextComponentType, NextPageContext } from 'next';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthToken } from 'components/hooks/auth';
import { APP_CONFIG } from '@lib/constants';

export interface AuthProps {
    authToken?: string;
}

/**
 * Client side get authToken hoc
 *
 * @param {NextComponentType} Component
 * @param {string} [redirectUrl='/login']
 * @returns {NextComponentType}
 */
export const withAuthTokenWrapper = (
    Component: NextComponentType<NextPageContext, unknown, AuthProps>,
): NextComponentType => {
    const WrappedComponent: FC = (props) => {
        const authToken = useAuthToken();

        return <Component authToken={authToken} {...props} />;
    };

    return WrappedComponent;
};

/**
 * Private route only hoc
 *
 * @param {NextComponentType} Component
 * @param {string} [redirectUrl='/login']
 * @returns {NextComponentType}
 */
export const privateRouteWrapper = (
    Component: NextComponentType,
    redirectUrl = APP_CONFIG.privateRedirectRoute,
): NextComponentType => {
    const WrappedComponent: FC<AuthProps> = ({ authToken, ...restProps }) => {
        const router = useRouter();

        useEffect(() => {
            // Always do navigations after the first render
            if (authToken) return;

            // redirect if not auth
            router.push(redirectUrl);
        }, [authToken, router]);

        // show loading when redirecting
        if (!authToken) {
            return <div className="text-xl">Loading ...</div>;
        }

        return <Component {...restProps} />;
    };

    return WrappedComponent;
};

/**
 * Public route only hoc
 *
 * @param {NextComponentType} Component
 * @param {string} [redirectUrl='/']
 * @returns {NextComponentType}
 */
export const publicOnlyRouteWrapper = (
    Component: NextComponentType,
    redirectUrl: string = APP_CONFIG.publicRedirectRoute,
): NextComponentType => {
    const WrappedComponent: FC<AuthProps> = ({ authToken, ...restProps }) => {
        const router = useRouter();

        useEffect(() => {
            // Always do navigations after the first render
            if (!authToken) return;

            // redirect if auth
            router.push(redirectUrl);
        }, [authToken, router]);

        // show loading when redirecting
        if (authToken) {
            return <div className="text-xl">Loading ...</div>;
        }

        return <Component {...restProps} />;
    };

    return WrappedComponent;
};
