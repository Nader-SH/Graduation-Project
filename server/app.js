import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import requestRoutes from './routes/requests.js';
import donationRoutes from './routes/donation.js';
import assistanceTypeRoutes from './routes/assistanceType.js';
import donorRoutes from './routes/donor.js';
import chatRoutes from './routes/chat.js';

// Import error handler
import { errorHandler } from './middlewares/auth.js';

dotenv.config();
const app = express();

const { NODE_ENV, PORT } = process.env;

app.set("port", process.env.PORT || 4000);

// Check for required environment variables
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/assistance-types', assistanceTypeRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/chats', chatRoutes);

// Error handling
app.use((req, res, next) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);

export default app;