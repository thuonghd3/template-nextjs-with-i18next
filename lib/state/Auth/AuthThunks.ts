import { AppThunk } from '@lib/state/types';
import { AuthActions, UserActions } from '@lib/state/_actions';
import { UserAuthInfo, SignUpInfo } from '@lib/domain/user/schema';
import { User } from '@lib/domain/user';

export const userLogin: (info: UserAuthInfo) => AppThunk<Promise<void>> = (
    info,
) => async (dispatch, _getState, container): Promise<void> => {
    // get auth token and user info
    // const orderIds = OrderReducer.selectors.getOrderIds(
    //     OrderReducer.getReducerState(_getState()),
    // );
    const payload = { ...info };
    // if (orderIds.length > 0) {
    //     payload.orders = orderIds;
    // }
    const token = await container.cradle.authService.login(payload);
    // if (orderIds.length > 0) {
    //     dispatch(OrderActions.removeOrderIds());
    // }
    // set auth token to redux state
    dispatch(AuthActions.setAuthToken(token));
    // save token
    container.cradle.authService.saveToken(token);
};

export const userSignUp = (info: SignUpInfo): AppThunk<Promise<User>> => async (
    dispatch,
    _getState,
    container,
): Promise<User> => {
    const res = await container.cradle.authService.signup(info);
    dispatch(UserActions.setUser(res));
    return res;
};

export const userLogOut = (): AppThunk<Promise<void>> => async (
    dispatch,
    _getState,
    container,
): Promise<void> => {
    // handle log out use case
    await container.cradle.logOutUseCase();
    // remove auth token from redux state
    dispatch(AuthActions.setAuthToken(undefined));
};

export default {
    userLogin,
    userLogOut,
    userSignUp,
};
