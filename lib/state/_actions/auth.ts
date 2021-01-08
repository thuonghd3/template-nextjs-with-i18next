import { createAction } from 'typesafe-actions';
import { createActionTypePrefixFormat } from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Auth');

/* ------------- action creators ------------- */
export const setAuthToken = createAction(
    typePrefixFormat('SET_AUTH_TOKEN'),
    (token: string | undefined) => ({
        token,
    }), // payload creator
)();

export type AuthActions = ReturnType<typeof setAuthToken>;
