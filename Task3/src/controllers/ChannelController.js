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
}
