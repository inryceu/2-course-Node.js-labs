export class ShowService {
  constructor(showRepository) {
    this.repository = showRepository;
  }

  async getAllShows() {
    return await this.repository.getAll();
  }

  async addShow(showData) {
    return await this.repository.create(showData);
  }
}
