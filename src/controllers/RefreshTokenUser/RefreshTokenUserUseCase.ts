import { AppError } from "@shared/errors/AppError";
import { prisma } from "@shared/infra/database";
import { isPast } from "date-fns";
import { injectable } from "inversify";
import { GenerateRefreshToken } from "provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "provider/GenerateTokenProvider";

export interface IResponseRefreshToken {
  token: string,
  newRefreshToken?: {
    id: string;
    expiresIn: number;
    userId: string;
  }
}

@injectable()
export class RefreshTokenUserUseCase {
  async execute(tokenId: string): Promise<IResponseRefreshToken> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: { id: tokenId },
    });

    if(!refreshToken) {
      throw new AppError('Token invalid!', 404);
    }
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    const dateToCheck = refreshToken.expiresIn * 1000;
    if(isPast(dateToCheck)) {
      await prisma.refreshToken.deleteMany({
        where: { userId: refreshToken.userId}
      });

      const generateTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateTokenProvider.execute(refreshToken.userId);

      return { token, newRefreshToken}
    }
    return {token};
  }
}