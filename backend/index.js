import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectDB.js';
import authRoute from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import verifyToken from './routes/verifyToken.routes.js'
import geminiRoutes from './routes/gemini.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const port = process.env.PORT;

connectDB();
app.listen(port, ()=> {
    console.log("Server started");
})

app.use(authRoute);
app.use(verifyToken);
app.use(geminiRoutes);