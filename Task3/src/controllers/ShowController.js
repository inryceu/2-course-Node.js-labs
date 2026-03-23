export class ShowController {
  constructor(showService) {
    this.showService = showService;
  }

  async getShowsPage(req, res) {
    try {
      const shows = await this.showService.getAllShows();
      res.render("shows", { shows });
    } catch (error) {
      console.error("Error reading shows:", error);
      res.status(500).send("Internal Server Error: " + error.message);
    }
  }

  async createShow(req, res) {
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
  }
}
