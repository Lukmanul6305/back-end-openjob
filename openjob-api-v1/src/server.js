import express from "express";
import { configDotenv } from "dotenv";
import pool from "./config/database.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});