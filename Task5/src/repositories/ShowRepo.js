import { IRepository } from "../contracts/IRepository.js";

export class ShowRepo extends IRepository {
  // _mapRowToShow(row) {
  //   if (!row) return null;
  //   return new Show(row.id, row.title);
  // }
  // async getAll() {
  //   try {
  //     const result = await pool.query("SELECT * FROM shows ORDER BY id ASC");
  //     return result.rows.map(this._mapRowToShow);
  //   } catch (error) {
  //     console.error("Помилка при отриманні передач з БД:", error);
  //     return [];
  //   }
  // }
  // async getById(id) {
  //   const result = await pool.query("SELECT * FROM shows WHERE id = $1", [id]);
  //   if (result.rows.length === 0) {
  //     throw new Error(`Show with id ${id} not found`);
  //   }
  //   return this._mapRowToShow(result.rows[0]);
  // }
  // async create(data) {
  //   const queryText = "INSERT INTO shows (title) VALUES ($1) RETURNING *";
  //   const result = await pool.query(queryText, [data.title]);
  //   return this._mapRowToShow(result.rows[0]);
  // }
  // async update(id, data) {
  //   const queryText = `
  //     UPDATE shows
  //     SET title = COALESCE($1, title)
  //     WHERE id = $2 RETURNING *
  //   `;
  //   const result = await pool.query(queryText, [data.title, id]);
  //   if (result.rowCount === 0) {
  //     throw new Error("Передачу для оновлення не знайдено");
  //   }
  //   return this._mapRowToShow(result.rows[0]);
  // }
  // async delete(id) {
  //   const result = await pool.query(
  //     "DELETE FROM shows WHERE id = $1 RETURNING id",
  //     [id],
  //   );
  //   if (result.rowCount === 0) {
  //     throw new Error("Передачу для видалення не знайдено");
  //   }
  //   return true;
  // }
}
