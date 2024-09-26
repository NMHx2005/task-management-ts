import { Express } from "express";
import { taskRoute } from "./task.route";
import { userRoute } from "./user.route";

import { requireAuth } from "../../middlewares/client/auth.middleware";

export const routeApi = (app: Express) => {
    app.use("/tasks", taskRoute);

    app.use("/users", requireAuth, userRoute);
}
