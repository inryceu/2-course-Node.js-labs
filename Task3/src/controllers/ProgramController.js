import { ProgramDTO } from "../dtos/program.dto.js";

export class ProgramController {
  constructor(programService) {
    this.programService = programService;
  }

  async getSchedulePage(req, res) {
    try {
      const sortBy = req.query.sort || "startTime";
      const schedule = await this.programService.getSortedSchedule(sortBy);
      // res.render("schedule", { schedule });
      return res.json(schedule);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async createProgram(req, res) {
    try {
      const programDto = new ProgramDTO(req.body);
      const newProgram = await this.programService.addProgram(programDto);
      // res.redirect("/schedule");
      return res.json(newProgram);
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  }

  async updateProgram(req, res) {
    try {
      const programId = Number(req.params.id);
      const programDto = new ProgramDTO(req.body);
      const updatedProgram = await this.programService.updateProgram(
        programId,
        programDto,
      );
      // res.redirect("/schedule");
      return res.json(updatedProgram);
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  }

  async deleteProgram(req, res) {
    try {
      const programId = Number(req.params.id);
      const isDeleted = await this.programService.deleteProgram(programId);
      // res.redirect("/schedule");
      return res.json(isDeleted);
    } catch (error) {
      res.status(400).send("Bad Request: " + error.message);
    }
  }
}
