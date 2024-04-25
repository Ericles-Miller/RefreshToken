import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { UsersRepository } from "@repositories/UsersRepository";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { GenerateRefreshToken } from "Middlewares/provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "Middlewares/provider/GenerateTokenProvider";

interface IResponse {
  refreshToken: {
    id: string;
    expiresIn: number;
    userId: string;
  },
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  async execute(email: string, password: string): Promise<IResponse> {
    const user = await this.usersRepository.checkEmailAlreadyExist(email);
    if (!user) {
      throw new AppError("email or password is incorrect!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id)

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(user.id)
    
    return {token, refreshToken};
  }
}
