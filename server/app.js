import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import userRouter from './routes/userRouter.js';
import requestRouter from './routes/requests.js';
import { getAllRequests, createRequest } from './controllers/requestController.js';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();

const { NODE_ENV, PORT } = process.env;

app.set("port", process.env.PORT || 4000);

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// CORS configuration
app.use(cors());

app.use([
    compression(),
    cookieParser(),
    bodyParser.urlencoded({ extended: true }),
    express.json(),
]);

// Use your routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/requests', requestRouter);

// Route to get all requests
app.get('/api/requests', getAllRequests);

// Route to create a new request
app.post('/api/requests', createRequest);
app.use(router);

app.use((req, res, next) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});

export default app;