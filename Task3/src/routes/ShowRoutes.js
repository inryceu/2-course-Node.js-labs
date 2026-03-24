import { Router } from "express";
import { ShowController } from "../controllers/ShowController.js";
import { ShowService } from "../services/ShowService.js";
import { ShowRepo } from "../repositories/ShowRepo.js";
import { requireAdmin, extractUser } from "../middlewares/auth.middleware.js";

const showRouter = Router();

const showRepo = new ShowRepo();
const showService = new ShowService(showRepo);
const showController = new ShowController(showService);

showRouter.get("/shows", extractUser, showController.getShowsPage);

showRouter.post("/shows", requireAdmin, showController.createShow);

export default showRouter;
