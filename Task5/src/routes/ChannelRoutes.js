import { Router } from "express";
import { ChannelController } from "../controllers/ChannelController.js";
import { ChannelService } from "../services/ChannelService.js";
import { ChannelRepo } from "../repositories/ChannelRepo.js";
import { requireAdmin, extractUser } from "../middlewares/auth.middleware.js";

const channelRouter = Router();

const channelRepo = new ChannelRepo();
const channelService = new ChannelService(channelRepo);
const channelController = new ChannelController(channelService);

channelRouter.get("/channels", extractUser, channelController.getChannelsPage);
channelRouter.post("/channels", requireAdmin, channelController.createChannel);
channelRouter.post(
	"/channels/:id/update",
	requireAdmin,
	channelController.updateChannel,
);
channelRouter.post(
	"/channels/:id/delete",
	requireAdmin,
	channelController.deleteChannel,
);

export default channelRouter;
