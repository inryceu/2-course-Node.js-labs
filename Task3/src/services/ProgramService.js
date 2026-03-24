export class ProgramService {
  constructor(programRepository) {
    this.repository = programRepository;
  }

  async getSortedSchedule(sortBy = "startTime") {
    const programs = await this.repository.getAll();

    return [...programs].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }

  async addProgram(dtoPayload) {
    return await this.repository.create(dtoPayload);
  }

  async updateProgram(programId, dtoPayload) {
    return await this.repository.update(programId, dtoPayload);
  }

  async deleteProgram(programId) {
    return await this.repository.delete(programId);
  }
}
