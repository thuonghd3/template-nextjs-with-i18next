import { PersistConfig, persistReducer } from 'redux-persist';
import { createReducer, getType } from 'typesafe-actions';

import { AuthActions } from '@lib/state/_actions';
import { produce } from 'immer';
import storage from 'redux-persist/lib/storage';
import { AuthState } from './types';

const stateKey = 'auth';

/* ------------- Initial State ------------- */
const INITIAL_STATE: AuthState = {
    token: undefined,
};

/* ------------- Reducers ------------- */
const setAuthToken = (
    state: AuthState,
    { payload: { token } }: ReturnType<typeof AuthActions.setAuthToken>,
): AuthState =>
    produce(state, (draft) => {
        draft.token = token;
    });

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(AuthActions.setAuthToken)]: setAuthToken,
});

const persistConfig: PersistConfig<AuthState> = {
    key: stateKey,
    storage,
};

const persistedReducer = persistReducer<AuthState, AuthActions.AuthActions>(
    persistConfig,
    reducer,
);

/* ------------- Selectors ------------- */
// use any for root state for now because of Dependency cycle error
// TODO: resolve dependency cycle error
// eslint-disable-next-line
const getReducerState = (state: any): AuthState => state[stateKey];

const selectors = {
    getAuthToken: (state: AuthState): string | undefined => state.token,
};

/* ------------- Export ------------- */
const reducerObject = {
    // default export
    selectors,

    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducer: persistedReducer,
};

export default reducerObject;
