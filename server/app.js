import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

const { NODE_ENV, PORT } = process.env;

app.set("port", process.env.PORT || 4000);

app.use([
    compression(),
    cookieParser(),
    express.urlencoded({ extended: false }),
    express.json(),
    cors({
        origin: "*",
    }),
]);

app.use((req, res, next) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});

export default app;