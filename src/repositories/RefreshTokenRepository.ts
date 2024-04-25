import { PrismaClient, RefreshTokens } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";
import { IRefreshTokenRepository } from "./IRefreshTokenRepository";
import { inject, injectable } from "inversify";
import { prisma } from "@shared/infra/database";

@injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshTokens> implements IRefreshTokenRepository {
  constructor(
    @inject('PrismaClient')
    prisma: PrismaClient
  ) { super(prisma.refreshTokens) }
  
  async delete(userId: string): Promise<void> {
    await prisma.refreshTokens.deleteMany({ where: { userId }});
  }
}
