import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { IRepository } from "../contracts/IRepository.js";
import { Show } from "../models/entities.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class ShowRepo extends IRepository {
  constructor() {
    super();
    this.filePath = path.join(__dirname, "../mockdata/shows.txt");
  }

  async getAll() {
    try {
      // Синхронний ввід-вивід
      // readFileSync -> блокує event loop до завершення операції читання, що може призвести до затримок у відповіді сервера, особливо при великому файлі.
      const rawData = fs.readFileSync(this.filePath, "utf-8");
      const lines = rawData.split("\n").filter((line) => line.trim() !== "");
      return lines.map((line) => {
        const [id, title] = line.split("|");
        return new Show(parseInt(id, 10), title.trim());
      });
    } catch (err) {
      return [];
    }
  }

  async create(data) {
    const shows = await this.getAll();
    const nextId =
      shows.length > 0 ? Math.max(...shows.map((s) => s.id)) + 1 : 201;
    const newShowLine = `\n${nextId}|${data.title}`;

    fs.appendFileSync(this.filePath, newShowLine, "utf-8");
    return new Show(nextId, data.title);
  }
}
