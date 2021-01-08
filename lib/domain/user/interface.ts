// Interfaces declaration for dependency inversion
import { User } from '@lib/domain/user';

import { GetServerSidePropsContext } from 'next';
import { UserAuthInfo, SignUpInfo, ForgotPasswordInfo } from '@lib/domain/user/schema';
import { ResetPasswordSuccess } from '@lib/state/Auth/types';

export interface ConvertCurrencyPayload {
    baseCurrency: string;
}

export interface IAuthService {
    /**
     * Login user by email and password
     *
     * @param {UserAuthInfo} info
     * @returns {Promise<string>}
     * @memberof AuthService
     */
    login: (info: UserAuthInfo) => Promise<string>;

    /**
     * Sign up only email
     * @param {SignUpInfo} info
     * @returns {Promise<User>}
     * @member IAuthService
     */
    signup: (info: SignUpInfo) => Promise<User>;


    /**
     * Reset password
     * @param {ForgotPasswordInfo} info
     * @returns {Promise<ResetPasswordSuccess>}
     * @member IAuthService
     */
    resetPassword: (info: ForgotPasswordInfo) => Promise<ResetPasswordSuccess>;

    /**
     * Save token
     *
     * @memberof IAuthService
     */
    saveToken: (token: string) => void;

    /**
     * Get saved token
     *
     * @memberof IAuthService
     */
    getToken: () => string | undefined;

    /**
     * Remove saved token
     *
     * @memberof IAuthService
     */
    removeToken: () => void;

    /**
     * subscribe to token change
     *
     * @memberof IAuthService
     */
    subscribeToken: (cb: (value: any) => any) => void;

    /**
     * unsubscribe to token change
     *
     * @memberof IAuthService
     */
    unsubscribeToken: (cb: (value: any) => any) => void;

    /**
     * Check auth token validity
     *
     * @memberof IAuthService
     */
    checkAuthTokenValid: (token: string) => Promise<boolean>;

    /**
     * Authenticate token from ssr request
     *
     * @memberof IAuthService
     */
    authenticateTokenSsr: (
        ctx: GetServerSidePropsContext,
    ) => Promise<string | undefined>;
}

export interface IUserRepository {
    /**
     * Get current logged in user
     *
     * @memberof IUserRepository
     */
    getMe: () => Promise<User>;

    /**
     * Get specific user by id
     *
     * @memberof IUserRepository
     */
    getById: (id: string) => Promise<User>;
}

export interface ICurrencyServices {
    /**
     * convert currency
     *
     * @memberof ICurrencyServices
     */
    convertCurrency: (data: ConvertCurrencyPayload) => Promise<any>;
}
