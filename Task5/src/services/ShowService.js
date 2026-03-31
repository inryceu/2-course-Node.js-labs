export class ShowService {
  constructor(showRepository) {
    this.repository = showRepository;
  }

  async getAllShows(page = 1, limit = 5, search = "") {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.repository.getPaginatedAndFiltered(
      limit,
      offset,
      search,
    );

    return {
      shows: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async getAllShowsSimple() {
    return await this.repository.getAll();
  }

  async addShow(showData) {
    return await this.repository.create(showData);
  }
}
