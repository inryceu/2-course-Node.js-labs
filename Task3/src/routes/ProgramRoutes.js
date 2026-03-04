import express from "express";
import { ProgramController } from "../controllers/ProgramController.js";
import { ProgramService } from "../services/ProgramService.js";
import { ProgramRepo } from "../repositories/ProgramRepo.js";

const router = express.Router();

const programRepo = new ProgramRepo();
const programService = new ProgramService(programRepo);
const programController = new ProgramController(programService);

router.get("/schedule", programController.getSchedulePage);
router.post("/schedule", programController.createProgram);

export default router;
