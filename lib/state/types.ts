import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Action } from 'redux';
import { AwilixContainer } from 'awilix';
import { Cradle } from '@lib/container';
import { RootState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    AwilixContainer<Cradle>,
    Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    AwilixContainer<Cradle>,
    Action<string>
>;
