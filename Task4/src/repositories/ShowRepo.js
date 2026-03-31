import { IRepository } from "../contracts/IRepository.js";
import { Show } from "../models/entities.js";
import { pool } from "../config/db.js";

export class ShowRepo extends IRepository {
  _mapRowToShow(row) {
    if (!row) return null;
    return new Show(row.id, row.title);
  }

  async getAll() {
    try {
      const result = await pool.query("SELECT * FROM shows ORDER BY id ASC");
      return result.rows.map(this._mapRowToShow);
    } catch (error) {
      console.error("Помилка при отриманні передач з БД:", error);
      return [];
    }
  }

  async getById(id) {
    const result = await pool.query("SELECT * FROM shows WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      throw new Error(`Show with id ${id} not found`);
    }
    return this._mapRowToShow(result.rows[0]);
  }

  async create(data) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(
        "INSERT INTO shows (title) VALUES ($1) RETURNING *",
        [data.title],
      );
      await client.query("COMMIT");
      return this._mapRowToShow(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id, data) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const queryText = `
        UPDATE shows
        SET title = COALESCE($1, title)
        WHERE id = $2 RETURNING *
      `;
      const result = await client.query(queryText, [data.title, id]);
      if (result.rowCount === 0) {
        throw new Error("Передачу для оновлення не знайдено");
      }
      await client.query("COMMIT");
      return this._mapRowToShow(result.rows[0]);
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
        "DELETE FROM shows WHERE id = $1 RETURNING id",
        [id],
      );
      if (result.rowCount === 0) {
        throw new Error("Передачу для видалення не знайдено");
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