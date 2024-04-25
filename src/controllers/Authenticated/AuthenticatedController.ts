import { Request, Response } from "express";

import { container } from "@shared/IoC";
import { AuthenticateUserUseCase } from "./AuthenticatedUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.get(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute(email, password);

    return response.json(token);
  }
}
