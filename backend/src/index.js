import express from 'express';
import router from '../routes/authRoutes.js';
import dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URL || "mongodb://localhost:27017/yourdbname";
console.log("connecting to MongoDB...");
mongoose.connect(mongoURI).then(()=>{
    console.log("MongoDB connected successfully");
    app.use(express.json());
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
    app.use("/",router);
}).catch((err)=>{
    console.log("MongoDB connection failed",err.message);

})
