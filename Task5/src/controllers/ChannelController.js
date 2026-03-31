import { CreateChannelDTO } from "../dtos/channel.dto.js";

export class ChannelController {
  constructor(channelService) {
    this.channelService = channelService;
  }

  getChannelsPage = async (req, res) => {
    try {
      const channels = await this.channelService.getAllChannels();
      res.render("channels", { channels, user: req.user || null });
    } catch (error) {
      res.status(500).send("Internal Server Error: " + error.message);
    }
  };

  createChannel = async (req, res) => {
    try {
      const channelDto = new CreateChannelDTO(req.body);
      await this.channelService.addChannel(channelDto);
      res.redirect("/channels");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  };

  updateChannel = async (req, res) => {
    try {
      const channelId = Number(req.params.id);
      const channelDto = new CreateChannelDTO(req.body);

      if (!channelId) {
        return res.status(400).send("Bad Request: id is required");
      }

      await this.channelService.updateChannel(channelId, channelDto);
      res.redirect("/channels");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  };

  deleteChannel = async (req, res) => {
    try {
      const channelId = Number(req.params.id);

      if (!channelId) {
        return res.status(400).send("Bad Request: id is required");
      }

      await this.channelService.deleteChannel(channelId);
      res.redirect("/channels");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  };
}
