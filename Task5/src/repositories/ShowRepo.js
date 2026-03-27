import { IRepository } from "../contracts/IRepository.js";
import { Show } from "../models/entities.js";
import { sequelize, ShowModel } from "../config/db.js";

export class ShowRepo extends IRepository {
  _mapRowToShow(row) {
    if (!row) return null;
    const data = row.get({ plain: true });
    return new Show(data.id, data.title);
  }

  async getAll() {
    try {
      const result = await ShowModel.findAll({
        order: [["id", "ASC"]],
      });
      return result.map((row) => this._mapRowToShow(row));
    } catch (error) {
      console.error("Помилка при отриманні передач з БД:", error);
      return [];
    }
  }

  async getById(id) {
    const result = await ShowModel.findByPk(id);
    if (!result) {
      throw new Error(`Show with id ${id} not found`);
    }
    return this._mapRowToShow(result);
  }

  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const newShow = await ShowModel.create(
        {
          title: data.title,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToShow(newShow);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const show = await ShowModel.findByPk(id, { transaction });

      if (!show) {
        throw new Error("Передачу для оновлення не знайдено");
      }

      await show.update(
        {
          title: data.title || show.title,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToShow(show);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const transaction = await sequelize.transaction();
    try {
      const deletedCount = await ShowModel.destroy({
        where: { id },
        transaction,
      });

      if (deletedCount === 0) {
        throw new Error("Передачу для видалення не знайдено");
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}