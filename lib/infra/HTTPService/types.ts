import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestParams {
    url: string;
    options?: AxiosRequestConfig;
    data?: Record<string, any>; // eslint-disable-line
    token?: string;
}

// export type NonAuthRequest = (params: RequestParams) => Promise<AxiosResponse>;
// export type AuthRequest = (params: AuthRequestParams) => Promise<AxiosResponse>;
export type HTTPRequest = (params: RequestParams) => Promise<AxiosResponse>;

export type FailureResponse = {
    message: string;
};

export interface ErrorDetail {
    loc: string[];
    msg: string;
    type: string;
}

export interface ServerErrorData {
    detail?: ErrorDetail[] | string;
    error?: {
        code: number;
        message?: string;
    };
}
