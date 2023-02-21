const http = require("http-status");
const { Task } = require("../models");
const ApiError = require("../utils/ApiError");

const createTask = async (task) => {
  const result = await Task.create(task);
  return result;
};

const getTaskById = async (id) => {
  return await Task.findById(id);
};

const updateTask = async (id, body) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(http.NOT_FOUND, "Task not found");
  }

  Object.assign(task, body);
  await task.save();
  return task;
};

const deletedTaskById = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  return task;
};

const search = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deletedTaskById,
  search,
};
