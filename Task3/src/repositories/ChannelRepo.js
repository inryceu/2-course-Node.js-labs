import { IRepository } from "../contracts/IRepository.js";
import { Channel } from "../models/entities.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ChannelRepo extends IRepository {
  constructor() {
    super();
    this.channels = null;
    this.filePath = path.join(__dirname, "../mockdata/channels.txt");
  }

  async loadChannels() {
    if (this.channels !== null) return;
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const lines = data.split("\n").filter(line => line.trim());
      this.channels = lines.map(line => {
        const [id, name] = line.split("|");
        return new Channel(parseInt(id), name);
      });
    } catch (error) {
      console.error("Error loading channels:", error);
      this.channels = [];
    }
  }

  async getAll() {
    await this.loadChannels();
    return this.channels;
  }

  async getById(id) {
    await this.loadChannels();
    return this.channels.find(channel => channel.id === id) || null;
  }

  async create(data) {
    await this.loadChannels();
    const newId = Math.max(...this.channels.map(c => c.id)) + 1;
    const newChannel = new Channel(newId, data.name);
    this.channels.push(newChannel);
    console.log("Mock saved:", newChannel);
    return newChannel;
  }

  async delete(id) {
    await this.loadChannels();
    const index = this.channels.findIndex(channel => channel.id === id);
    if (index !== -1) {
      this.channels.splice(index, 1);
      return true;
    }
    return false;
  }
}