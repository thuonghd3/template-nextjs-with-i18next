import { IAuthService } from '@lib/domain/user/interface';

// TODO:
// normally use case will use callbacks pattern since there would be multiple cases happen within usecase
// but for example purposes i'm using async with only success / failure cases

// interface Callbacks {
//     onSuccess: (res: Commit[], linkInfo?: LinkHeader) => void;
//     onError: (error: Error) => void;
// }

interface Dependencies {
    authService: IAuthService;
}

export type LogOutUseCase = () => Promise<void>;

const logout = ({ authService }: Dependencies): LogOutUseCase => {
    /**
     * Log out user use case
     *
     */
    const logOutUseCase: LogOutUseCase = async () => {
        authService.removeToken();
    };

    return logOutUseCase;
};

export default logout;
