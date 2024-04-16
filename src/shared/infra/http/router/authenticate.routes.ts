import { AuthenticateUserController } from "@controllers/Authenticated/AuthenticatedController";
import { Router } from "express";

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticateRoutes.post("/user", authenticateUserController.handle);

