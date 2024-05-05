const { Todo } = require("../../models");
const { sendSuccess, sendError } = require("../../utils");

const addTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({
    title,
    description,
    userId: req.userId,
  });
  sendSuccess(res, todo, "Todo created successfully");
};

const getTodos = async (req, res) => {
  const {
    filter,
    sort = "createdAt",
    order = "ASC",
    page = 1,
    pageSize = 10,
  } = req.query;
  const limit = parseInt(pageSize);
  const offset = (page - 1) * limit;

  const where = filter
    ? {
        title: { [Sequelize.Op.like]: `%${filter}%` },
      }
    : {};

  const todos = await Todo.findAndCountAll({
    where,
    order: [[sort, order.toUpperCase()]],
    limit,
    offset,
  });

  sendSuccess(
    res,
    {
      data: todos.rows,
      total: todos.count,
      totalPages: Math.ceil(todos.count / limit),
      currentPage: page,
    },
    "Todos retrieved successfully"
  );
};
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return sendError(res, "Todo not found", 404);
  }

  todo.title = title || todo.title;
  todo.description = description || todo.description;
  await todo.save();

  sendSuccess(res, todo, "Todo updated successfully");
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return sendError(res, "Todo not found", 404);
  }

  await todo.destroy();
  sendSuccess(res, null, "Todo deleted successfully");
};

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
