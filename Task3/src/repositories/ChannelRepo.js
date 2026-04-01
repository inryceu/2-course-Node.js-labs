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
    // Асинхронний з callback
    // return new Promise -> дозволяє обернути асинхронну операцію з callback у проміс, що полегшує роботу з асинхронним кодом і дозволяє використовувати async/await для більш чистого синтаксису.
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf-8", (err, data) => {
        // callback для обробки результату читання файлу. Якщо виникає помилка, вона передається в err, а якщо операція успішна, дані передаються в data.
        if (err) {
          console.error("Помилка читання channels.json:", err.message);
          // Якщо файл не існує або виникла інша помилка, повертаємо порожній масив замість відмови.
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
