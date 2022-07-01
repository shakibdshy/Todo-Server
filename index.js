import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import postRouter from "./routes/post.js"
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("Disconnected", () => {
    console.log("Disconnected from MongoDB")
})

app.use(cors());

app.use(express.json());

app.use("/api/post", postRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 500;
    res.status(err).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
