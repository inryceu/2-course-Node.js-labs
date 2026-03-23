import { IRepository } from "../contracts/IRepository.js";
import { User, Admin, Role } from "../models/entities.js";
import { pool } from "../config/db.js";

export class AuthRepo extends IRepository {
  _mapRowToUser(row) {
    if (!row) return null;
    return row.role === Role.ADMIN
      ? new Admin(
          row.id,
          row.first_name,
          row.last_name,
          row.email,
          row.password,
        )
      : new User(
          row.id,
          row.first_name,
          row.last_name,
          row.email,
          row.password,
        );
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows.map(this._mapRowToUser);
  }

  async getById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0)
      throw new Error(`User with id ${id} not found`);
    return this._mapRowToUser(result.rows[0]);
  }

  async create(userDto) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const queryText = `
        INSERT INTO users (first_name, last_name, email, password, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
      `;
      const values = [
        userDto.firstName,
        userDto.lastName,
        userDto.email,
        userDto.password,
        Role.USER,
      ];
      const result = await client.query(queryText, values);

      await client.query("COMMIT");
      return this._mapRowToUser(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(
        "Помилка створення користувача (Транзакцію відкочено):",
        error,
      );
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id, userDto) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const queryText = `
        UPDATE users
        SET first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            email = COALESCE($3, email),
            password = COALESCE($4, password)
        WHERE id = $5 RETURNING *
      `;
      const values = [
        userDto.firstName,
        userDto.lastName,
        userDto.email,
        userDto.password,
        id,
      ];
      const result = await client.query(queryText, values);

      if (result.rowCount === 0) {
        throw new Error("Користувача для оновлення не знайдено");
      }

      await client.query("COMMIT");
      return this._mapRowToUser(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // DELETE (Транзакційно)
  async delete(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING id",
        [id],
      );

      if (result.rowCount === 0) {
        throw new Error("Користувача для видалення не знайдено");
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

  // Кастомний метод для логіну
  async findUserByEmailAndPassword(email, password) {
    const queryText = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const result = await pool.query(queryText, [email, password]);

    if (result.rows.length === 0) {
      throw new Error("Invalid password or email");
    }
    return this._mapRowToUser(result.rows[0]);
  }
}
