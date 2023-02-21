const monggose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new monggose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePaginate);

const Task = monggose.model("Task", taskSchema);

module.exports = Task;
