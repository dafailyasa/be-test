const express = require("express");
const httpStatus = require("http-status");
const routes = require("./routes");
const ApiError = require("./utils/apiError");
const { errorConverter, errorHandler } = require("./middlewares/error");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// /api api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
