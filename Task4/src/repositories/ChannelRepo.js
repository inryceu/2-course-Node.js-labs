import { IRepository } from "../contracts/IRepository.js";
import { Channel } from "../models/entities.js";
import { pool } from "../config/db.js";

export class ChannelRepo extends IRepository {
  _mapRowToChannel(row) {
    if (!row) return null;
    return new Channel(row.id, row.name);
  }

  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM channels ORDER BY id ASC");
      return result.rows.map(this._mapRowToChannel);
    } catch (error) {
      console.error("Помилка при отриманні каналів з БД:", error);
      return [];
    }
  }

  async getById(id) {
    const result = await pool.query("SELECT * FROM channels WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      throw new Error(`Channel with id ${id} not found`);
    }
    return this._mapRowToChannel(result.rows[0]);
  }

  async create(channelDto) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "INSERT INTO channels (name) VALUES ($1) RETURNING *",
        [channelDto.name],
      );
      await client.query("COMMIT");
      return this._mapRowToChannel(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id, channelDto) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const queryText = `
        UPDATE channels
        SET name = COALESCE($1, name)
        WHERE id = $2 RETURNING *
      `;
      const result = await client.query(queryText, [channelDto.name, id]);
      if (result.rowCount === 0) {
        throw new Error("Канал для оновлення не знайдено");
      }
      await client.query("COMMIT");
      return this._mapRowToChannel(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "DELETE FROM channels WHERE id = $1 RETURNING id",
        [id],
      );
      if (result.rowCount === 0) {
        throw new Error("Канал для видалення не знайдено");
      }
      await client.query("COMMIT");
      return true;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
