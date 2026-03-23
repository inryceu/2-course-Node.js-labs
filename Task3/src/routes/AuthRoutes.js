import express from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { AuthService } from '../services/AuthService.js';
import { AuthRepo } from "../repositories/AuthRepo.js";
import sessionStore from "../services/SessionStore.js";

const router = express.Router();

const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService, sessionStore);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;