const express = require("express");
const taskRoute = require("./task.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/task",
    route: taskRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
