const joi = require("joi");
const { objectId } = require("./custom.validation");

const create = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().optional(),
    status: joi.bool().default(false),
  }),
};

const updateTask = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().optional(),
    status: joi.bool().default(false),
  }),
};

const taskID = {
  params: joi.object().keys({
    id: joi.string().custom(objectId),
  }),
};

const searchTaskQuery = {
  query: joi.object().keys({
    search: joi.string().optional(),
    sortBy: joi.string().valid("desc", "asc"),
  }),
};

module.exports = {
  create,
  taskID,
  updateTask,
  searchTaskQuery,
};
