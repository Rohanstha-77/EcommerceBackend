import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Database connected")
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
};

export default dbConnect;
