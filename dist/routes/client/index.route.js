"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeApi = void 0;
const task_route_1 = require("./task.route");
const user_route_1 = require("./user.route");
const auth_middleware_1 = require("../../middlewares/client/auth.middleware");
const routeApi = (app) => {
    app.use("/tasks", task_route_1.taskRoute);
    app.use("/users", auth_middleware_1.requireAuth, user_route_1.userRoute);
};
exports.routeApi = routeApi;
