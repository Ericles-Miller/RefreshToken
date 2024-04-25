import { AuthenticateUserUseCase } from "@controllers/Authenticated/AuthenticatedUseCase";
import { RefreshTokenUserUseCase } from "@controllers/RefreshTokenUser/RefreshTokenUserUseCase";
import { UsersService } from "@controllers/UsersService";
import { GenerateRefreshToken } from "@Middlewares/provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "@Middlewares/provider/GenerateTokenProvider";
import { PrismaClient, RefreshTokens, Users } from "@prisma/client";
import { BaseRepository } from "@repositories/BaseRepository";
import { IRefreshTokenRepository } from "@repositories/IRefreshTokenRepository";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { RefreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { prisma } from "@shared/infra/database";
import { Container } from "inversify";

export const container = new Container();

container.bind<IUsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<IRefreshTokenRepository>(RefreshTokenRepository).toSelf().inSingletonScope();
container.bind<BaseRepository<Users>>('UsersRepository').to(UsersRepository)
container.bind<BaseRepository<RefreshTokens>>('RefreshTokenRepository').to(RefreshTokenRepository)
container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);

container.bind<UsersService>(UsersService).toSelf() 
container.bind<AuthenticateUserUseCase>(AuthenticateUserUseCase).toSelf()
container.bind<RefreshTokenUserUseCase>(RefreshTokenUserUseCase).toSelf()
container.bind<GenerateRefreshToken>(GenerateRefreshToken).toSelf()
container.bind<GenerateTokenProvider>(GenerateTokenProvider).toSelf()