import { AppThunk } from '@lib/state/types';
import { UserActions } from '@lib/state/_actions';
import { User } from '@lib/domain/user';

/**
 * Get current auth user information
 *
 * @returns {AppThunk<Promise<void>>}
 */
export const userGetMe = (): AppThunk<Promise<void>> => async (
    dispatch,
    _getState,
    container,
): Promise<void> => {
    // get current user info
    const user = await container.cradle.userRepository.getMe();

    // set user to redux state
    dispatch(UserActions.setUser(user));
};

/**
 * Get user by id
 *
 * @param {string} id
 * @returns {AppThunk<Promise<User>>}
 */
export const userGetById = (id: string): AppThunk<Promise<User>> => async (
    _dispatch,
    _getState,
    container,
): Promise<User> => {
    // get user info
    const user = await container.cradle.userRepository.getById(id);

    return user;
};

export default {
    userGetMe,
    userGetById,
};
