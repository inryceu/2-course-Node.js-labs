import express from "express";
import { ProgramController } from "../controllers/ProgramController.js";
import { ProgramService } from "../services/ProgramService.js";
import { ProgramRepo } from "../repositories/ProgramRepo.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

const router = express.Router();

const programRepo = new ProgramRepo();
const programService = new ProgramService(programRepo);
const programController = new ProgramController(programService);

router.get("/", (req, res) => programController.getSchedulePage(req, res));

router.post("/create", requireAdmin, (req, res) => programController.createProgram(req, res));
router.put("/update/:id", requireAdmin, (req, res) => programController.updateProgram(req, res));
router.delete("/delete/:id", requireAdmin, (req, res) => programController.deleteProgram(req, res));

export default router;