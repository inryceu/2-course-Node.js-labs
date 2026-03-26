import { IRepository } from "../contracts/IRepository.js";

export class ChannelRepo extends IRepository {
  // _mapRowToChannel(row) {
  //   if (!row) return null;
  //   return new Channel(row.id, row.name);
  // }
  // async getAll() {
  //   try {
  //     const result = await pool.query("SELECT * FROM channels ORDER BY id ASC");
  //     return result.rows.map(this._mapRowToChannel);
  //   } catch (error) {
  //     console.error("Помилка при отриманні каналів з БД:", error);
  //     return [];
  //   }
  // }
  // async getById(id) {
  //   const result = await pool.query("SELECT * FROM channels WHERE id = $1", [
  //     id,
  //   ]);
  //   if (result.rows.length === 0) {
  //     throw new Error(`Channel with id ${id} not found`);
  //   }
  //   return this._mapRowToChannel(result.rows[0]);
  // }
  // async create(channelDto) {
  //   const queryText = "INSERT INTO channels (name) VALUES ($1) RETURNING *";
  //   const result = await pool.query(queryText, [channelDto.name]);
  //   return this._mapRowToChannel(result.rows[0]);
  // }
  // async update(id, channelDto) {
  //   const queryText = `
  //     UPDATE channels
  //     SET name = COALESCE($1, name)
  //     WHERE id = $2 RETURNING *
  //   `;
  //   const result = await pool.query(queryText, [channelDto.name, id]);
  //   if (result.rowCount === 0) {
  //     throw new Error("Канал для оновлення не знайдено");
  //   }
  //   return this._mapRowToChannel(result.rows[0]);
  // }
  // async delete(id) {
  //   const result = await pool.query(
  //     "DELETE FROM channels WHERE id = $1 RETURNING id",
  //     [id],
  //   );
  //   if (result.rowCount === 0) {
  //     throw new Error("Канал для видалення не знайдено");
  //   }
  //   return true;
  // }
}
