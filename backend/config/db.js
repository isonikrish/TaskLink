import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;