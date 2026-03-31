import { ProgramDTO } from "../dtos/program.dto.js";

export class ProgramController {
  constructor(programService, showService, channelService) {
    this.programService = programService;
    this.showService = showService;
    this.channelService = channelService;
  }

  getSchedulePage = async (req, res) => {
    try {
      const sortBy = req.query.sort || "startTime";
      const schedule = await this.programService.getSortedSchedule(sortBy);

      const shows = await this.showService.getAllShowsSimple();
      const channels = await this.channelService.getAllChannels();

      res.render("schedule", {
        schedule,
        shows,
        channels,
        user: req.user || null,
      });
    } catch (error) {
      res.status(500).send("Internal Server Error: " + error.message);
    }
  };

  createProgram = async (req, res) => {
    try {
      const programDto = new ProgramDTO(req.body);
      await this.programService.addProgram(programDto);
      res.redirect("/schedule");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  };

  updateProgram = async (req, res) => {
    try {
      const programId = Number(req.params.id);
      const programDto = new ProgramDTO(req.body);
      await this.programService.updateProgram(programId, programDto);
      res.redirect("/schedule");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  };

  deleteProgram = async (req, res) => {
    try {
      const programId = Number(req.params.id);
      await this.programService.deleteProgram(programId);
      res.redirect("/schedule");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  };
}
