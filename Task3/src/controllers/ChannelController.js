import { CreateChannelDTO } from "../dtos/channel.dto.js";

export class ChannelController {
  constructor(channelService) {
    if (!channelService) {
      throw new Error('ChannelService not provided');
    }
    this.channelService = channelService;
  }

  async getChannelsPage(req, res) {
    try {
      const channels = await this.channelService.getAllChannels();
      res.render("channels", { channels });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getChannelById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const channel = await this.channelService.getChannelById(id);
      if (channel) {
        res.json(channel);
      } else {
        res.status(404).send("Channel not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async createChannel(req, res) {
    try {
      const dto = new CreateChannelDTO(req.body);
      await this.channelService.addChannel(dto);
      res.redirect("/channels");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  }

  async deleteChannel(req, res) {
    try {
      const id = parseInt(req.params.id);
      const success = await this.channelService.deleteChannel(id);
      if (success) {
        res.redirect("/channels");
      } else {
        res.status(404).send("Channel not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}