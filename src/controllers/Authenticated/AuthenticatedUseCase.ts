import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { UsersRepository } from "@repositories/UsersRepository";
import { IUsersRepository } from "@repositories/IUsersRepository";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
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

    const token = sign({}, "40fe3ccb6f87eb4cf80f3c5dda631e2f", { // tambem pode ser gerado outro id aqui
      // chave do token
      subject: user.id, // relaciona ao id
      expiresIn: "5m", // tempo para expirar
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
