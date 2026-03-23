import express from "express";
import { ChannelController } from "../controllers/ChannelController.js";
import { ChannelService } from "../services/ChannelService.js";
import { ChannelRepo } from "../repositories/ChannelRepo.js";

const router = express.Router();

const channelRepo = new ChannelRepo();
const channelService = new ChannelService(channelRepo);
const channelController = new ChannelController(channelService);

router.get('/channels', channelController.getChannelsPage.bind(channelController));
router.get('/channels/:id', channelController.getChannelById.bind(channelController));
router.post('/channels', channelController.createChannel.bind(channelController));
router.delete('/channels/:id', channelController.deleteChannel.bind(channelController));

export default router;