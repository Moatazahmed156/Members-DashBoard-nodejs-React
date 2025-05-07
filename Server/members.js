const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Members = sequelize.define(
  "Members",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    committee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Members",
  }
);

module.exports = Members;
