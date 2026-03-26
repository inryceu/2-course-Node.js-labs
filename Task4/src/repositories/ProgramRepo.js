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
    const queryText = `
      INSERT INTO programs (channel_id, show_id, start_time) 
      VALUES ($1, $2, $3) RETURNING *
    `;
    const values = [data.channelId, data.showId, data.startTime];

    try {
      const result = await pool.query(queryText, values);
      return this._mapRowToProgram(result.rows[0]);
    } catch (error) {
      console.error(
        "Помилка створення програми (можливо, невірний channelId або showId):",
        error,
      );
      throw error;
    }
  }

  async update(id, dtoPayload) {
    const queryText = `
      UPDATE programs
      SET channel_id = COALESCE($1, channel_id),
          show_id = COALESCE($2, show_id),
          start_time = COALESCE($3, start_time)
      WHERE id = $4 RETURNING *
    `;
    const values = [
      dtoPayload.channelId,
      dtoPayload.showId,
      dtoPayload.startTime,
      id,
    ];

    const result = await pool.query(queryText, values);

    if (result.rowCount === 0) {
      throw new Error("Програму для оновлення не знайдено");
    }
    return this._mapRowToProgram(result.rows[0]);
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM programs WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rowCount === 0) {
      throw new Error("Програму для видалення не знайдено");
    }
    return true;
  }
}
