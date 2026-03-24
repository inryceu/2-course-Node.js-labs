export class ChannelService {
  constructor(channelRepository) {
    this.repository = channelRepository;
  }

  async getAllChannels() {
    return await this.repository.getAll();
  }

  async getChannelById(id) {
    return await this.repository.getById(id);
  }

  async addChannel(dtoPayload) {
    const newChannel = await this.repository.create(dtoPayload);
    return newChannel;
  }

  async deleteChannel(id) {
    return await this.repository.delete(id);
  }
}