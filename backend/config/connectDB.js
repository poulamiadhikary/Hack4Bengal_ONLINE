import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    try {
        await mongoose.connect(uri);
        console.log("Database connected");
    } catch (err) {
        console.log(err.message);
    }
}