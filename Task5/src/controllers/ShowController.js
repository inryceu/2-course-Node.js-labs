export class ShowController {
  constructor(showService) {
    this.showService = showService;
  }

  getShowsPage = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";

      const { shows, totalPages, currentPage } =
        await this.showService.getAllShows(page, limit, search);

      res.render("shows", {
        shows,
        user: req.user || null,
        currentPage,
        totalPages,
        search,
        limit,
      });
    } catch (error) {
      console.error("Error reading shows:", error);
      res.status(500).send("Internal Server Error: " + error.message);
    }
  };

  createShow = async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).send("Bad Request: Show title is required");
      }
      await this.showService.addShow({ title });
      res.redirect("/shows");
    } catch (error) {
      console.error("Error creating show:", error);
      res
        .status(500)
        .send("Internal Server Error during saving: " + error.message);
    }
  };
}
