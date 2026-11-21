/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import jwt from "jsonwebtoken";

/**
 * Express route/controller ya Node.js utility: `isAuth`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `isAuth(req, res);`
 */
export const isAuth = (req, res, next) => {
    try {
        /**
         * Express route/controller or Node.js utility: `token`.
         * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
         * Example: `token(req, res);`
         */
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        /**
         * Express route/controller or Node.js utility: `decoded`.
         * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
         * Example: `decoded(req, res);`
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.id = decoded.userId; 

        next();
    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};