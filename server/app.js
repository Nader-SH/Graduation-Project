import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import userRouter from './routes/userRouter.js';
dotenv.config();
const app = express();

const { NODE_ENV, PORT } = process.env;

app.set("port", process.env.PORT || 4000);

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:8000',
        'http://localhost:3000',
        'https://graduation-project-1-3tvj.onrender.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use([
    compression(),
    cookieParser(),
    express.urlencoded({ extended: true }),
    express.json(),
]);

// Update the base path for all API routes
app.use('/api/users', userRouter);
app.use(router);
app.use((req, res, next) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});

export default app;