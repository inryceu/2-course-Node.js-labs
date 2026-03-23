export class ShowService {
  constructor(showRepository) {
    this.repository = showRepository;
  }

  async getAllShows() {
    const shows = await this.repository.getAll();
    return shows;
  }

  async addShow(showData) {
    return await this.repository.create(showData);
  }
}
