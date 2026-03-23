import { Router } from "express";
import { AuthRepo } from "../repositories/AuthRepo.js";
import { AuthService } from "../services/AuthService.js";
import { AuthController } from "../controllers/AuthController.js";
import sessionStore from "../services/SessionStore.js";

const authRouter = Router();

const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService, sessionStore);

authRouter.get("/login", (req, res) => res.render("login"));
authRouter.get("/register", (req, res) => res.render("register"));

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);

export default authRouter;
