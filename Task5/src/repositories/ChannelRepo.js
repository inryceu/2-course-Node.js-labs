import { IRepository } from "../contracts/IRepository.js";
import { Channel } from "../models/entities.js";
import { sequelize, ChannelModel } from "../config/db.js";

export class ChannelRepo extends IRepository {
  _mapRowToChannel(row) {
    if (!row) return null;
    const data = row.get({ plain: true });
    return new Channel(data.id, data.name);
  }

  async getAll() {
    try {
      const result = await ChannelModel.findAll({
        order: [["id", "ASC"]],
      });
      return result.map((row) => this._mapRowToChannel(row));
    } catch (error) {
      console.error("Помилка при отриманні каналів з БД:", error);
      return [];
    }
  }

  async getById(id) {
    const result = await ChannelModel.findByPk(id);
    if (!result) {
      throw new Error(`Channel with id ${id} not found`);
    }
    return this._mapRowToChannel(result);
  }

  async create(channelDto) {
    const transaction = await sequelize.transaction();
    try {
      const newChannel = await ChannelModel.create(
        {
          name: channelDto.name,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToChannel(newChannel);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id, channelDto) {
    const transaction = await sequelize.transaction();
    try {
      const channel = await ChannelModel.findByPk(id, { transaction });

      if (!channel) {
        throw new Error("Канал для оновлення не знайдено");
      }

      await channel.update(
        {
          name: channelDto.name || channel.name,
        },
        { transaction },
      );

      await transaction.commit();
      return this._mapRowToChannel(channel);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const transaction = await sequelize.transaction();
    try {
      const deletedCount = await ChannelModel.destroy({
        where: { id },
        transaction,
      });

      if (deletedCount === 0) {
        throw new Error("Канал для видалення не знайдено");
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
