import { Sequelize, DataTypes } from "sequelize";

const connectionString = process.env.DATABASE_URL;

export const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const UserModel = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  },
  {
    tableName: "users",
    timestamps: false,
  },
);

export const ChannelModel = sequelize.define(
  "Channel",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: "channels",
    timestamps: false,
  },
);

export const ShowModel = sequelize.define(
  "Show",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "shows",
    timestamps: false,
  },
);

export const ProgramModel = sequelize.define(
  "Program",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    start_time: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "programs",
    timestamps: false,
  },
);

ChannelModel.hasMany(ProgramModel, { foreignKey: "channel_id" });
ProgramModel.belongsTo(ChannelModel, { foreignKey: "channel_id" });

ShowModel.hasMany(ProgramModel, { foreignKey: "show_id" });
ProgramModel.belongsTo(ShowModel, { foreignKey: "show_id" });

sequelize
  .authenticate()
  .then(() => console.log("Sequelize connected to PostgreSQL"))
  .catch((err) => console.error("Unable to connect to the database:", err));

sequelize.sync();
