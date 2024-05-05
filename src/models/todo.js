const { Model, DataTypes } = require("sequelize");
const sequelize = require("@config");
const User = require("./user");

class Todo extends Model {}

Todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
    timestamps: true,
  }
);

Todo.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Todo, { foreignKey: "userId" });

module.exports = Todo;
