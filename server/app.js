import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config();
const app = express();

const { NODE_ENV, PORT } = process.env;

app.set("port", process.env.PORT || 4000);

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// Add allowed origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://graduation-project-1-3tvj.onrender.com'
];

app.use([
    compression(),
    cookieParser(),
    express.urlencoded({ extended: true }),
    express.json(),
    cors({
        origin: function(origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
            }
            return callback(null, true);
        },
        credentials: true
    }),
]);
app.use(router);
app.use((req, res, next) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message);
});

export default app;