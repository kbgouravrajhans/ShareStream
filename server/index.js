import express from 'express'
import router from "./routes/router.js"
import cors from "cors";
import connectDB from './database/db.js';

const app = express();
const PORT = 8000;

connectDB();

app.use(cors());

app.use('/', router);

app.listen(`${PORT}`, ()=> {
    console.log(`Server running on Port - ${PORT}`)
})