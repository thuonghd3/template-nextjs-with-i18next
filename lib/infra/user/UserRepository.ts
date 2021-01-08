import { IAuthService, IUserRepository } from '@lib/domain/user/interface';

import { HTTPService } from '@lib/infra/HTTPService/HTTPService';
import { User } from '@lib/domain/user';

interface Dependencies {
    httpService: HTTPService;
    authService: IAuthService;
}

export class UserRepository implements IUserRepository {
    private authService: IAuthService;

    private httpService: HTTPService;

    constructor({ authService, httpService }: Dependencies) {
        this.authService = authService;
        this.httpService = httpService;
    }

    async getMe(): Promise<User> {
        const url = 'users/me';

        // get auth token
        const authToken = this.authService.getToken();

        const res = await this.httpService.authGet({
            url,
            token: authToken,
        });

        const { user } = res.data;

        return user;
    }

    async getById(id: string): Promise<User> {
        const url = `users/${id}`;

        // get auth token
        const authToken = this.authService.getToken();

        const res = await this.httpService.authGet({
            url,
            token: authToken,
        });

        const user = res.data;

        return user;
    }
}
