import { CreateProgramDTO } from "../dtos/program.dto.js";

export class ProgramController {
  constructor(programService) {
    this.programService = programService;
  }

  async getSchedulePage(req, res) {
    try {
      const sortBy = req.query.sort || "startTime";
      const schedule = await this.programService.getSortedSchedule(sortBy);

      res.render("schedule", { schedule });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async createProgram(req, res) {
    try {
      const dto = new CreateProgramDTO(req.body);
      await this.programService.addProgram(dto);
      res.redirect("/schedule");
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  }
}
