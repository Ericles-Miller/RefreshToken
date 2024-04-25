import { container } from "@shared/IoC";
import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const {refreshToken} = request.body;

    const refreshTokenUserUseCase = container.get(RefreshTokenUserUseCase);

    const token = await refreshTokenUserUseCase.execute(refreshToken);

    return response.json(token);
  }
}