const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Members = require("./members");

const Attendance = sequelize.define(
  "attendances",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    session: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "attendances",
    timeStamp: true,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["memberId", "session"],
      },
    ],
  }
);
Members.hasMany(Attendance, {
  foreignKey: "memberId",
});
Attendance.belongsTo(Members, {
  foreignKey: "memberId",
  onDelete: "CASCADE",
});

module.exports = Attendance;
