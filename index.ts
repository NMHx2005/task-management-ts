import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { connectDatabase } from "./config/database";
import { routeApi } from "./routes/client/index.route";
connectDatabase();

const app: Express = express();
const port: number | string= process.env.PORT || 3000;

// CORS
// Cách 1: Tất cả các tên miền được phép truy cập
app.use(cors())

// Cách 2: Truy cập cho từng tên miền
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
// End CORS


// parse application/json
app.use(bodyParser.json());

routeApi(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});