const express = require("express");
const { valid } = require("joi");
const validate = require("../middlewares/validate");
const { taskValidation } = require("../utils/validations");
const { taskController } = require("../controllers");

const router = express.Router();

router.post(
  "/create",
  validate(taskValidation.create),
  taskController.createTask
);
router.get("/search", taskController.search);

router
  .route("/:id")
  .get(validate(taskValidation.taskID), taskController.findById)
  .patch(
    validate(taskValidation.updateTask),
    validate(taskValidation.taskID),
    taskController.updateTaskById
  )
  .delete(validate(taskValidation.taskID), taskController.deleteTaskById);

module.exports = router;
