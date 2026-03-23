import express from "express";
import { ShowController } from "../controllers/ShowController.js";
import { ShowService } from "../services/ShowService.js";
import { ShowRepo } from "../repositories/ShowRepo.js";

const router = express.Router();

const showRepo = new ShowRepo();
const showService = new ShowService(showRepo);
const showController = new ShowController(showService);

router.get("/shows", showController.getShowsPage.bind(showController));
router.post("/shows", showController.createShow.bind(showController));

export default router;
