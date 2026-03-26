import { Router } from "express";
import { ProgramRepo } from "../repositories/ProgramRepo.js";
import { ShowRepo } from "../repositories/ShowRepo.js";
import { ChannelRepo } from "../repositories/ChannelRepo.js";
import { ProgramService } from "../services/ProgramService.js";
import { ShowService } from "../services/ShowService.js";
import { ChannelService } from "../services/ChannelService.js";
import { ProgramController } from "../controllers/ProgramController.js";
import { requireAdmin, extractUser } from "../middlewares/auth.middleware.js";

const programRouter = Router();

const programRepo = new ProgramRepo();
const showRepo = new ShowRepo();
const channelRepo = new ChannelRepo();

const programService = new ProgramService(programRepo);
const showService = new ShowService(showRepo);
const channelService = new ChannelService(channelRepo);

const programController = new ProgramController(
  programService,
  showService,
  channelService,
);

programRouter.get("/", extractUser, programController.getSchedulePage);

programRouter.post("/create", requireAdmin, programController.createProgram);
programRouter.post(
  "/:id/update",
  requireAdmin,
  programController.updateProgram,
);
programRouter.post(
  "/:id/delete",
  requireAdmin,
  programController.deleteProgram,
);

export default programRouter;
