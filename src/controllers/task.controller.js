const { taskService } = require("../services");
const http = require("http-status");

const createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await taskService.createTask(body);
    
    return res.status(http.OK).json(task);
  } catch (err) {
    return next(err);
  }
}

const findById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if(!task) {
      return res.status(http.NOT_FOUND).json({message: "task not found"});
    }

    return res.status(http.OK).json(task);
  } catch (err) {
    return next(err);
  }
}

const updateTaskById = async (req, res, next) => {
  try {
    const {body, params} = req;
    const task = await taskService.updateTask(params.id, body);
    
    return res.status(http.OK).json(task);
  } catch (err) {
    next(err);
  }
}

const deleteTaskById = async (req, res, next) => {
  try {
    const task = await taskService.deletedTaskById(req.params.id);
    let deleted = task ? true : false;

    return res.status(http.OK).json({deleted})
  } catch (err) {
    next(err);
  }
}

const search = async (req, res, next) => {
  try {  
    const { query } = req;

    const filter = query.search ? { title: { $regex: new RegExp(query.search), $options: "i" } } : {};
    const limit = query.limit ? +query.limit : 10;
    const offset = query.page ? +query.page * limit : 0;
    const sortBy = query?.sortBy === "desc" ? -1 : 0;

    const tasks = await taskService.search(filter, { limit, offset, sort: {"createdAt": sortBy} });

    const data = {
      data: tasks.docs,
      count: tasks.totalDocs,
      total: tasks.totalPages,
      limit: tasks.limit,
      totalPages: tasks.totalPages,
      currentPage: tasks.page,
    }

    return res.status(http.OK).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  findById,
  updateTaskById,
  deleteTaskById,
  search,
}