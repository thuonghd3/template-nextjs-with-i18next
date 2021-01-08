import { AuthToken, User } from '@lib/domain/user';
import Cookies from 'universal-cookie';
import { GetServerSidePropsContext } from 'next';
import { HTTPService } from '@lib/infra/HTTPService/HTTPService';
import { HTTPStatusCode } from '@lib/infra/HTTPService/helpers';
import { IAuthService } from '@lib/domain/user/interface';
import {
    UserAuthInfo,
    SignUpInfo,
    ForgotPasswordInfo,
} from '@lib/domain/user/schema';
import jwtDecode from 'jwt-decode';
import { TypedEvent } from '@lib/helpers/event';
import { RequestError } from '@lib/domain/app';

export interface DecodedToken {
    readonly email: string;
    readonly exp: number;
}

const TOKEN_COOKIE_KEY = 'token';

interface Dependencies {
    httpService: HTTPService;
}

type TokenListener = (value?: string) => void;
export class AuthService implements IAuthService {
    private httpService: HTTPService;

    private onTokenChange = new TypedEvent<string | undefined>();

    private cookies = new Cookies();

    constructor({ httpService }: Dependencies) {
        this.httpService = httpService;
    }

    async login(info: UserAuthInfo): Promise<string> {
        const url = `token`;
        // prepare form data
        const formData = new FormData();
        formData.append('username', info.email);
        formData.append('password', info.password);
        // call login POST api
        const { data }: { data: AuthToken } = await this.httpService.post({
            url,
            data: formData,
        });

        const { access_token } = data;

        return access_token;
    }

    async signup(info: SignUpInfo): Promise<User> {
        // call login POST api
        const res: { data: User & RequestError } = await this.httpService.post({
            url: 'register',
            data: info,
        });
        const { data } = res;
        if (data.message) {
            throw new Error(data.message);
        }
        return data;
    }
    // eslint-disable-next-line
    async resetPassword(info: ForgotPasswordInfo): Promise<any> {
        const res = await this.httpService.post({
            url: 'users/forgot-password',
            data: info,
        });
        const { data } = res;
        return data;
    }

    saveToken = (token: string): void => {
        // save token to browser cookies
        this.cookies.set(TOKEN_COOKIE_KEY, token, { path: '/' });

        // token listener cb execute
        this.onTokenChange.emit(token);
    };

    getToken = (): string | undefined => {
        // get token from browser cookies
        const token = this.cookies.get<string>(TOKEN_COOKIE_KEY);

        return token;
    };

    subscribeToken = (cb: TokenListener): void => {
        this.onTokenChange.on(cb);
    };

    unsubscribeToken = (cb: TokenListener): void => {
        this.onTokenChange.off(cb);
    };

    removeToken = (): void => {
        // get token from browser cookies
        this.cookies.remove(TOKEN_COOKIE_KEY, { path: '/' });

        // token listener cb execute
        this.onTokenChange.emit(undefined);
    };

    checkAuthTokenValid = async (token: string): Promise<boolean> => {
        // false if no token
        if (!token) return Promise.resolve(false);

        // decode jwt token
        const decodedToken: DecodedToken = jwtDecode(token);
        // check if token expired
        const expiresAt = new Date(decodedToken.exp * 1000);
        const isExpired = new Date() > expiresAt;

        // token valid if not expired
        const isAuthenticated = !isExpired;
        // TODO: might need to call auth validate api to validate token ( e.g '/auth/validate' or '/user/me' )

        if (!isAuthenticated) {
            // emit unauthorized event
            this.httpService.unauthorizedEvent.emit(
                HTTPStatusCode.UNAUTHORIZED,
            );
        }

        return Promise.resolve(isAuthenticated);
    };

    authenticateTokenSsr = async (
        ctx: GetServerSidePropsContext,
    ): Promise<string | undefined> => {
        // get cookies from request header
        // create new Cookies instance to get cookie from request headers
        const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
        const token = cookies.get(TOKEN_COOKIE_KEY);

        // check token validity
        const isValid = await this.checkAuthTokenValid(token);

        // return nothing if not valid
        if (!isValid) return Promise.resolve(undefined);

        // save token from request header for later use
        this.saveToken(token);

        return Promise.resolve(token);
    };
}
