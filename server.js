import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {readdirSync} from 'fs';

const morgan = require("morgan");
dotenv.config();

// Create app
const app = express();

// DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("MongoDB Connected!");
      } catch (err) {
        console.log("MongoDB connection error: ", err);
    }
}
connectDB();

// Middleware
app.use(cors("http://localhost:3000/"));
app.use(express.json());

// Route
readdirSync('./routes').map((file)=>{
    app.use("/api", require(`./routes/${file}`))
});


// Listen
const port = process.env.PORT || 8000;
console.log("Process env", process.env.PORT);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})