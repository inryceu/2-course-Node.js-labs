import { IRepository } from "../contracts/IRepository.js";
import { TvProgram } from "../models/entities.js";
import { sequelize, ProgramModel } from "../config/db.js";

export class ProgramRepo extends IRepository {
  _mapRowToProgram(row) {
    if (!row) return null;
    const data = row.get({ plain: true });
    return new TvProgram(
      data.id,
      data.channel_id,
      data.show_id,
      data.start_time,
    );
  }

  async getAll() {
    try {
      const result = await ProgramModel.findAll({
        order: [["start_time", "ASC"]],
      });
      return result.map((row) => this._mapRowToProgram(row));
    } catch (error) {
      console.error("Помилка при отриманні розкладу з БД:", error);
      return [];
    }
  }

  async getById(id) {
    const result = await ProgramModel.findByPk(id);
    if (!result) {
      throw new Error(`Program with id ${id} not found`);
    }
    return this._mapRowToProgram(result);
  }

  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const newProgram = await ProgramModel.create(
        {
          channel_id: data.channelId,
          show_id: data.showId,
          start_time: data.startTime,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToProgram(newProgram);
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Помилка створення програми (можливо, невірний channelId або showId):",
        error,
      );
      throw error;
    }
  }

  async update(id, dtoPayload) {
    const transaction = await sequelize.transaction();
    try {
      const program = await ProgramModel.findByPk(id, { transaction });

      if (!program) {
        throw new Error("Програму для оновлення не знайдено");
      }

      await program.update(
        {
          channel_id: dtoPayload.channelId || program.channel_id,
          show_id: dtoPayload.showId || program.show_id,
          start_time: dtoPayload.startTime || program.start_time,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToProgram(program);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const transaction = await sequelize.transaction();
    try {
      const deletedCount = await ProgramModel.destroy({
        where: { id },
        transaction,
      });

      if (deletedCount === 0) {
        throw new Error("Програму для видалення не знайдено");
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
