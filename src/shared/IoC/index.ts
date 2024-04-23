import { AuthenticateUserUseCase } from "@controllers/Authenticated/AuthenticatedUseCase";
import { RefreshTokenUserUseCase } from "@controllers/RefreshTokenUser/RefreshTokenUserUseCase";
import { UsersService } from "@controllers/UsersService";
import { PrismaClient, Users } from "@prisma/client";
import { BaseRepository } from "@repositories/BaseRepository";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { prisma } from "@shared/infra/database";
import { Container } from "inversify";

export const container = new Container();

container.bind<IUsersRepository>(UsersRepository).toSelf().inSingletonScope();
container.bind<BaseRepository<Users>>('UsersRepository').to(UsersRepository)
//container.bind<BaseRepository<Posts>>('PostRepository').to(PostRepository)
container.bind<PrismaClient>('PrismaClient').toConstantValue(prisma);

container.bind<UsersService>(UsersService).toSelf() 
container.bind<AuthenticateUserUseCase>(AuthenticateUserUseCase).toSelf()
container.bind<RefreshTokenUserUseCase>(RefreshTokenUserUseCase).toSelf()