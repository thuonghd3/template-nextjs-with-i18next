import { APP_CONFIG } from '@lib/constants';
import { Reducer } from 'redux';

export const reducerPrefixFormat = (_key: string): string =>
    `${APP_CONFIG.prefixReducer}/${_key}/`.toUpperCase();

export const createActionTypePrefixFormat = (
    prefix: string,
): ((name: string) => string) => {
    const actionTypePrefixFormat = (type: string): string => {
        return reducerPrefixFormat(prefix) + type;
    };

    return actionTypePrefixFormat;
};

export interface ReducerObject<S = unknown, T = unknown, P = unknown> {
    selectors: Record<string, (sate: T) => P>;
    // eslint-disable-next-line
    INITIAL_STATE: any;
    stateKey: string;
    getReducerState: (state: S) => S;
    reducer: Reducer;
}
