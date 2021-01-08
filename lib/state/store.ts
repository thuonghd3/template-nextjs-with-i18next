/* eslint-disable no-underscore-dangle */
import { Store, applyMiddleware, combineReducers, createStore } from 'redux';

import { StateType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import container from '@lib/container';
import thunk from 'redux-thunk';
import { useMemo } from 'react';
import * as reducers from './reducers';

// init root reducer combining sub reducers
export const rootReducer = combineReducers({
    [reducers.AuthReducer.stateKey]: reducers.AuthReducer.reducer,
    [reducers.UserReducer.stateKey]: reducers.UserReducer.reducer,
});

// define RootState type
export type RootState = StateType<typeof rootReducer>;

// const persistConfig = {
//     key: 'primary',
//     storage,
//     whitelist: [reducers.AuthReducer.stateKey], // place to select which state you want to persist
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = (initialState?: RootState): Store => {
    const middleware = [];
    // const enhancers = [];

    // middleware.push(GraphQLClient.middleware())

    /* ------------- Thunk Middleware ------------- */
    // inject container to thunk's extra argument
    const thunkMiddleWare = thunk.withExtraArgument(container);
    middleware.push(thunkMiddleWare);

    /* ------------- Assemble Middleware ------------- */

    // enhancers.push(composeWithDevTools(applyMiddleware(...middleware)));

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );
};

// store instance
// eslint-disable-next-line import/no-mutable-exports
export let store: Store | undefined;

// creates the store
export const initializeStore = (preloadedState?: RootState): Store => {
    let _store = store ?? makeStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

/**
 * Get store instance hook
 *
 * @param {RootState} initialState
 * @returns {Store}
 */
export const useStore = (initialState: RootState): Store => {
    const _store = useMemo(() => initializeStore(initialState), [initialState]);
    return _store;
};
