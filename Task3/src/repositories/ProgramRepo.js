import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { IRepository } from "../contracts/IRepository.js";
import { TvProgram } from "../models/entities.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class ProgramRepo extends IRepository {
  constructor() {
    super();
    this.filePath = path.join(__dirname, "../mockdata/programs.json");
    this.programs = [];
    this.idCounter = 1;
  }

  // Асинхронний з Promise
  loadData() {
    return fs
      .readFile(this.filePath, "utf-8")
      // readFile -> асинхронний метод для читання файлу, який повертає проміс. Він не блокує event loop, дозволяючи серверу обробляти інші запити під час читання файлу.
      .then((data) => {
        const parsed = JSON.parse(data);
        this.programs = parsed.map(
          (p) => new TvProgram(p.id, p.channelId, p.showId, p.startTime),
        );
        this.idCounter =
          this.programs.length > 0
            ? Math.max(...this.programs.map((p) => p.id)) + 1
            : 1;
        return this.programs;
      })
      .catch((err) => {
        console.error("Помилка читання programs.json", err);
        return [];
      });
  }

  async getAll() {
    if (this.programs.length === 0) await this.loadData();
    return this.programs;
  }

  async create(data) {
    if (this.programs.length === 0) await this.loadData();
    const newProgram = new TvProgram(
      this.idCounter++,
      data.channelId,
      data.showId,
      data.startTime,
    );
    this.programs.push(newProgram);
    return newProgram;
  }
}
