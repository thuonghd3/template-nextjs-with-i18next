// import { PersistConfig, persistReducer } from 'redux-persist';
import { createReducer, getType } from 'typesafe-actions';

import { User } from '@lib/domain/user';
import { UserActions } from '@lib/state/_actions';
import { produce } from 'immer';
// import storage from 'redux-persist/lib/storage';
// import storage from '@lib/state/storage';

import { UserState } from './types';

const stateKey = 'user';

/* ------------- Initial State ------------- */
const INITIAL_STATE: UserState = {
    user: undefined,
};

/* ------------- Reducers ------------- */
const setUser = (
    state: UserState,
    { payload: { user } }: ReturnType<typeof UserActions.setUser>,
): UserState =>
    produce(state, (draft: UserState) => {
        draft.user = user;
    });
/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
    [getType(UserActions.setUser)]: setUser,
});

// const persistConfig: PersistConfig<UserState> = {
//     key: stateKey,
//     storage,
// };

// const persistedReducer = persistReducer<UserState, UserActions.UserActions>(
//     persistConfig,
//     reducer,
// );

/* ------------- Selectors ------------- */
// use any for root state for now because of Dependency cycle error
// TODO: resolve dependency cycle error
// eslint-disable-next-line
const getReducerState = (state: any): UserState => state[stateKey];

const selectors = {
    getUser: (state: UserState): User | undefined => state.user,
};

/* ------------- Export ------------- */
const reducerObject = {
    // default export
    selectors,

    INITIAL_STATE,

    stateKey,
    getReducerState,
    reducer,
};

export default reducerObject;
