import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { IRepository } from "../contracts/IRepository.js";
import { Channel } from "../models/entities.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ChannelRepo extends IRepository {
  constructor() {
    super();
    this.filePath = path.join(__dirname, "../mockdata/channels.json");
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf-8", (err, data) => {
        if (err) {
          console.error("Помилка читання channels.json:", err.message);
          return resolve([]);
        }

        try {
          const parsed = JSON.parse(data);
          const channels = parsed.map((c) => new Channel(c.id, c.name));
          resolve(channels);
        } catch (parseErr) {
          console.error("Помилка парсингу channels.json:", parseErr.message);
          resolve([]);
        }
      });
    });
  }
}
