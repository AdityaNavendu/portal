/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import companyRoutes from "./routes/company.route.js";
import userRoutes from "./routes/userroutes.js";
import jobRoutes from "./routes/jobroute.js";
import applicationroute from "./routes/applicationroute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: function (origin, callback) {
        /**
         * Express route/controller or Node.js utility: `allowed`.
         * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
         * Example: `allowed(req, res);`
         */
        const allowed = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ];


        if (!origin) return callback(null, true);

        if (allowed.includes(origin)) return callback(null, true);

        return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));





app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello World",
        timestamp: new Date().toISOString(),
        success: true
    });
});

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/applicants", applicationroute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});