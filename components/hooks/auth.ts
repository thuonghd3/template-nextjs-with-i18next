import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import container from '@lib/container';

/**
 * Get auth token hook
 *
 * @returns {(AuthToken | undefined)}
 */
export const useAuthToken = (): string | undefined => {
    const [authToken, setAuthToken] = useState(
        container.cradle.authService.getToken(),
    );

    // watch token change
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const subscriber = (value: string) => {
            setAuthToken(value);
        };
        container.cradle.authService.subscribeToken(subscriber);

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
            container.cradle.authService.unsubscribeToken(subscriber);
        };
    }, []);

    return authToken;
};

/**
 * Require auth hook
 *
 * @param {string} [redirectUrl='/login']
 * @returns {boolean}
 */
export const useRequireAuth = (redirectUrl = '/login'): boolean => {
    // const authToken = useSelector((state) =>
    //     AuthReducer.selectors.getAuthToken(AuthReducer.getReducerState(state)),
    // );
    const authToken = useAuthToken();
    const router = useRouter();

    // If authToken is false that means we're not
    // logged in and should redirect.
    useEffect(() => {
        if (!authToken) {
            router.push(redirectUrl);
        }
    }, [authToken, redirectUrl, router]);

    const valid = !!authToken;
    return valid;
};

/**
 * Public only hook ( no auth )
 *
 * @param {string} [redirectUrl='/']
 * @returns {boolean}
 */
export const useAuthPublicOnly = (redirectUrl = '/'): boolean => {
    const authToken = useAuthToken();
    const router = useRouter();

    // If authToken is truthy that means we're
    // logged in and should redirect.
    useEffect(() => {
        if (authToken) {
            router.push(redirectUrl);
        }
    }, [authToken, redirectUrl, router]);

    const valid = !authToken;
    return valid;
};
