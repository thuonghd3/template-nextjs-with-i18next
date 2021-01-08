import * as awilix from 'awilix';

import { IAuthService, IUserRepository } from '@lib/domain/user/interface';
import makeHTTPService, {
    HTTPService,
} from '@lib/infra/HTTPService/HTTPService';

import { AuthService } from '@lib/infra/auth/AuthService';
import { UserRepository } from '@lib/infra/user/UserRepository';

import makeLogOutUseCase, { LogOutUseCase } from '@lib/app/auth/logOutUseCase';

export interface Cradle {
    // services
    httpService: HTTPService;
    authService: IAuthService;
    // repositories
    userRepository: IUserRepository;
    // apps
    logOutUseCase: LogOutUseCase;
}

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer<Cradle>();

/* ------------- Infra ------------- */
container
    // services
    .register({
        httpService: awilix.asFunction(makeHTTPService).singleton(),
        authService: awilix.asClass(AuthService).singleton(),
    })
    // repositories
    .register({
        userRepository: awilix.asClass(UserRepository),
    });
/* ------------- App ------------- */
container
    // commit
    .register({
        logOutUseCase: awilix.asFunction(makeLogOutUseCase),
    });

export default container;
