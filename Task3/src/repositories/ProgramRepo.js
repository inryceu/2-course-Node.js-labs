import { IRepository } from "../contracts/IRepository.js";
import { TvProgram } from "../models/entities.js";

export class ProgramRepo extends IRepository {
  constructor() {
    super();

    let idCounter = 1;
    this.generateId = () => {
      return idCounter++;
    };

    this.programs = [
      new TvProgram(1, 101, 201, "18:00"),
      new TvProgram(2, 102, 202, "20:00"),
    ];
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
    console.log("Mock saved:", newProgram);

    return newProgram;
  }
}
