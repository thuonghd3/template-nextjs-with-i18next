import { AxiosError, AxiosResponse } from 'axios';

import {
    serverErrorDataToString,
    HTTPStatusCode,
    UnauthorizedEvent,
} from './helpers';
import { HTTPRequest, RequestParams } from './types';

/**
 * HTTP request function wrapper to handle error
 *
 * @param {HTTPRequest} func
 * @returns {HTTPRequest}
 */
export const serviceErrorHandler = (
    func: HTTPRequest,
    unauthorizedEvent: UnauthorizedEvent,
): HTTPRequest => async (
    params: RequestParams,
    // eslint-disable-next-line
): Promise<AxiosResponse<any>> => {
    try {
        const res = await func(params);

        /**
         * application level error
         * status still 200
         * e.g {
         *  "message": exc.msg,
         *  "success": False,
         * }
         */
        if (res.data && res.data.success === false) {
            throw res.data;
        }

        return res;
    } catch (e) {
        const error = e as AxiosError;
        let message;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            message = serverErrorDataToString(error.response.data);

            // Handle unauthorized case
            if (error.response.status === HTTPStatusCode.UNAUTHORIZED) {
                // TODO: try to use DI without cyclic dependency for this case
                // dispatch authrozied error event
                unauthorizedEvent.emit(HTTPStatusCode.UNAUTHORIZED);
            }

            // } else if (error.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //     message = error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            message = error.message;
        }

        throw new Error(message);
    }
};
