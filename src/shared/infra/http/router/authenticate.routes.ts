import { AuthenticateUserController } from "@controllers/Authenticated/AuthenticatedController";
import { RefreshTokenUserController } from "@controllers/RefreshTokenUser/RefreshTokenUserController";
import { Router } from "express";

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();

authenticateRoutes.post('/refreshToken', refreshTokenController.handle);
authenticateRoutes.post("/user", authenticateUserController.handle);
