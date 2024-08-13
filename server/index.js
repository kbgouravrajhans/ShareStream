import express from 'express'
import router from "./routes/router.js"
import cors from "cors";
import connectDB from './database/db.js';
import 'dotenv/config'

const app = express();

connectDB();

app.use(cors());

app.use('/', router);

app.listen(`${process.env.PORT}`, ()=> {
    console.log(`Server running on Port - ${process.env.PORT}`)
})