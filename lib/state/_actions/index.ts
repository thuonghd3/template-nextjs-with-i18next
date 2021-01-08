import * as UserActions from './user';
import * as AuthActions from './auth';

export { AuthActions, UserActions };

export type RootAction = AuthActions.AuthActions | UserActions.UserActions;
