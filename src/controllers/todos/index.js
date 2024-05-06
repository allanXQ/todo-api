const { messages } = require("../../config");
const { Todo } = require("../../models");
const { sendSuccess, sendBadRequest } = require("../../utils");
const { Sequelize } = require("sequelize");

const findTodoById = async (id, res) => {
  const todo = await Todo.findByPk(id);
  if (!todo) {
    sendBadRequest(res, messages.todoNotFound);
    return null;
  }
  return todo;
};

const addTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({
    title,
    description,
    userId: req.userId,
  });
  sendSuccess(res, todo, messages.createTodoSuccess);
};

const getTodos = async (req, res) => {
  const {
    filter,
    sort = "createdAt",
    order = "ASC",
    page = 1,
    pageSize = 10,
  } = req.query;

  const userId = req.userId;
  const limit = parseInt(pageSize);
  const offset = (page - 1) * limit;
  const where = {
    userId,
    ...(filter && { title: { [Sequelize.Op.like]: `%${filter}%` } }),
  };

  const todos = await Todo.findAndCountAll({
    where,
    order: [[sort, order.toUpperCase()]],
    limit,
    offset,
    attributes: ["id", "title", "description", "completed"],
  });

  const totalPages = Math.ceil(todos.count / limit);

  sendSuccess(
    res,
    {
      data: todos.rows,
      total: todos.count,
      totalPages,
      currentPage: page,
    },
    messages.getTodoSuccess
  );
};

const updateTodo = async (req, res) => {
  const { id, title, description, completed } = req.body;
  const userId = req.userId;
  const todo = await Todo.findOne({ where: { id, userId } });
  if (!todo) {
    sendBadRequest(res, messages.todoNotFound);
    return;
  }

  todo.title = title || todo.title;
  todo.description = description || todo.description;
  todo.completed = completed || todo.completed;
  await todo.save();
  const returnTodo = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  };

  sendSuccess(res, returnTodo, messages.todoUpdateSuccess);
};

const deleteTodo = async (req, res) => {
  const { id } = req.body;

  const todo = await findTodoById(id, res);
  if (!todo) return;

  await todo.destroy();
  sendSuccess(res, null, messages.todoDeleteSuccess);
};

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
