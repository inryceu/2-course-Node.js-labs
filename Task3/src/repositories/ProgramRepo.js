import { IRepository } from "../contracts/IRepository.js";
import { TvProgram } from "../models/entities.js";
import initialPrograms from "../mockdata/programs.json" with { type: "json" };

export class ProgramRepo extends IRepository {
  constructor() {
    super();

    let maxId = this.programs.reduce((max, p) => (p.id > max ? p.id : max), 0);
    let idCounter = maxId + 1;
    this.generateId = () => {
      return idCounter++;
    };

    this.programs = initialPrograms.map(p => 
      new TvProgram(p.id, p.channelId, p.showId, p.startTime)
    );
  }

  async getAll() {
    return this.programs;
  }

  async create(data) {
    const newId = this.generateId();
    const newProgram = new TvProgram(
      newId,
      data.channelId,
      data.showId,
      data.startTime,
    );
    this.programs.push(newProgram);
    console.log("Program created: ", newProgram);
    return newProgram;
  }

  async update(programId, dtoPayload) {
    const program = await this.findProgramById(programId);
    if (dtoPayload.channelId) program.channelId = dtoPayload.channelId;
    if (dtoPayload.showId) program.showId = dtoPayload.showId;
    if (dtoPayload.startTime) program.startTime = dtoPayload.startTime;
    console.log("Program with id: " + programId + " updated");
    return program;
  }

  async delete(programId) {
    const program = await this.findProgramById(programId);
    this.programs = this.programs.filter((p) => p.id !== program.id);
    console.log("Program with id: " + programId + " deleted");
    return true;
  }

  async findProgramById(programId) {
    const program = this.programs.find((p) => p.id === programId);
    if (!program) {
      throw new Error(`Program with id: ${programId} doesn't exist`);
    }
    return program;
  }
}
