import { GenerateRefreshToken } from "@Middlewares/provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "@Middlewares/provider/GenerateTokenProvider";
import { RefreshTokens } from "@prisma/client";
import { IRefreshTokenRepository } from "@repositories/IRefreshTokenRepository";
import { RefreshTokenRepository } from "@repositories/RefreshTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { container } from "@shared/IoC";
import { isPast } from "date-fns";
import { inject, injectable } from "inversify";

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
  constructor(
    @inject(RefreshTokenRepository)
    private refreshTokenRepository : IRefreshTokenRepository,
  ) {}


  async execute(tokenId: string): Promise<IResponseRefreshToken> {
    const refreshToken : RefreshTokens = await this.refreshTokenRepository.findById(tokenId);
    if(!refreshToken) {
      throw new AppError('Token invalid!', 404);
    }
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    const dateToCheck = refreshToken.expiresIn * 1000;
    if(isPast(dateToCheck)) {
      await this.refreshTokenRepository.delete(refreshToken.userId);

      const generateTokenProvider = container.get(GenerateRefreshToken);
      const newRefreshToken = await generateTokenProvider.execute(refreshToken.userId);

      return { token, newRefreshToken}
    }
    return {token};
  }
}