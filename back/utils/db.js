import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * Backend function: `connectDB`.
 * Environment URL se MongoDB/Mongoose connection establish karta hai.
 * Example: `connectDB(actual arguments);`
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;