import { IRepository } from "../contracts/IRepository.js";
import { TvProgram } from "../models/entities.js";
import { pool } from "../config/db.js";

export class ProgramRepo extends IRepository {
  _mapRowToProgram(row) {
    if (!row) return null;
    return new TvProgram(row.id, row.channel_id, row.show_id, row.start_time);
  }

  async getAll() {
    try {
      const result = await pool.query(
        "SELECT * FROM programs ORDER BY start_time ASC",
      );
      return result.rows.map(this._mapRowToProgram);
    } catch (error) {
      console.error("Помилка при отриманні розкладу з БД:", error);
      return [];
    }
  }

  async getById(id) {
    const result = await pool.query("SELECT * FROM programs WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      throw new Error(`Program with id ${id} not found`);
    }
    return this._mapRowToProgram(result.rows[0]);
  }

  async create(data) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Бізнес-валідація: перевіряємо існування каналу і передачі в одній транзакції
      const channelCheck = await client.query(
        "SELECT id FROM channels WHERE id = $1",
        [data.channelId],
      );
      if (channelCheck.rows.length === 0) {
        throw new Error(`Канал з id ${data.channelId} не існує`);
      }

      const showCheck = await client.query(
        "SELECT id FROM shows WHERE id = $1",
        [data.showId],
      );
      if (showCheck.rows.length === 0) {
        throw new Error(`Передача з id ${data.showId} не існує`);
      }

      const result = await client.query(
        "INSERT INTO programs (channel_id, show_id, start_time) VALUES ($1, $2, $3) RETURNING *",
        [data.channelId, data.showId, data.startTime],
      );

      await client.query("COMMIT");
      return this._mapRowToProgram(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Помилка створення програми (транзакцію відкочено):", error.message);
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id, dtoPayload) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const queryText = `
        UPDATE programs
        SET channel_id = COALESCE($1, channel_id),
            show_id = COALESCE($2, show_id),
            start_time = COALESCE($3, start_time)
        WHERE id = $4 RETURNING *
      `;
      const result = await client.query(queryText, [
        dtoPayload.channelId,
        dtoPayload.showId,
        dtoPayload.startTime,
        id,
      ]);
      if (result.rowCount === 0) {
        throw new Error("Програму для оновлення не знайдено");
      }
      await client.query("COMMIT");
      return this._mapRowToProgram(result.rows[0]);
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
        "DELETE FROM programs WHERE id = $1 RETURNING id",
        [id],
      );
      if (result.rowCount === 0) {
        throw new Error("Програму для видалення не знайдено");
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
