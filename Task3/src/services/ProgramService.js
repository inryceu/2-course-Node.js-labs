export class ProgramService {
  constructor(programRepository) {
    this.repository = programRepository;
  }

  async getSortedSchedule(sortBy = "time") {
    const programs = await this.repository.getAll();
    return programs.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }

  async addProgram(dtoPayload) {
    const newProgram = await this.repository.create(dtoPayload);
    return newProgram;
  }

  async updateProgram(programId, dtoPayload) {
    const updatedProgram = await this.repository.update(programId, dtoPayload);
    return updatedProgram;
  }

  async deleteProgram(programId) {
    const isDeleted = await this.repository.delete(programId);
    return isDeleted;
  }
}
