import { IRepository } from "../contracts/IRepository.js";
import { User, Admin, Role } from "../models/entities.js";
import { sequelize, UserModel } from "../config/db.js";

export class AuthRepo extends IRepository {
  _mapRowToUser(row) {
    if (!row) return null;

    const data = row.get({ plain: true });

    return data.role === Role.ADMIN
      ? new Admin(
          data.id,
          data.first_name,
          data.last_name,
          data.email,
          data.password,
        )
      : new User(
          data.id,
          data.first_name,
          data.last_name,
          data.email,
          data.password,
        );
  }

  async getAll() {
    const result = await UserModel.findAll({
      order: [["id", "ASC"]],
    });
    return result.map((row) => this._mapRowToUser(row));
  }

  async getById(id) {
    const result = await UserModel.findByPk(id);
    if (!result) throw new Error(`User with id ${id} not found`);
    return this._mapRowToUser(result);
  }

  async create(userDto) {
    const transaction = await sequelize.transaction();
    try {
      const newUser = await UserModel.create(
        {
          first_name: userDto.firstName,
          last_name: userDto.lastName,
          email: userDto.email,
          password: userDto.password,
          role: Role.USER,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToUser(newUser);
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Помилка створення користувача (Транзакцію відкочено):",
        error,
      );
      throw error;
    }
  }

  // UPDATE (Транзакційно)
  async update(id, userDto) {
    const transaction = await sequelize.transaction();
    try {
      const user = await UserModel.findByPk(id, { transaction });

      if (!user) {
        throw new Error("Користувача для оновлення не знайдено");
      }

      await user.update(
        {
          first_name: userDto.firstName || user.first_name,
          last_name: userDto.lastName || user.last_name,
          email: userDto.email || user.email,
          password: userDto.password || user.password,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToUser(user);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const transaction = await sequelize.transaction();
    try {
      const deletedCount = await UserModel.destroy({
        where: { id },
        transaction,
      });

      if (deletedCount === 0) {
        throw new Error("Користувача для видалення не знайдено");
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findUserByEmailAndPassword(email, password) {
    const result = await UserModel.findOne({
      where: { email, password },
    });

    if (!result) {
      throw new Error("Invalid password or email");
    }
    return this._mapRowToUser(result);
  }
}
