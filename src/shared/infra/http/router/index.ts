import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

export const router = Router();

router.use('/users', usersRoutes)
router.use("/sessions", authenticateRoutes);
