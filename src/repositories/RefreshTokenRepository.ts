import { PrismaClient, RefreshToken } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { IResponseRefreshToken } from "./IRefresTokenRepository";
import { inject, injectable } from "inversify";
import { prisma } from "@shared/infra/database";


@injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> implements IResponseRefreshToken {
  constructor(
    @inject('PrismaClient')
    prisma: PrismaClient
  ) {
    super(prisma.refreshToken);
  }

  async delete(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({ where: { userId }});
  }
}
