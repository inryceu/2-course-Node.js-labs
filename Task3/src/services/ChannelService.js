export class ChannelService {
  constructor(channelRepository) {
    this.repository = channelRepository;
  }

  async getAllChannels() {
    return await this.repository.getAll();
  }
}
