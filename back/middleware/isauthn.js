import jwt from "jsonwebtoken";

/**
 * Backend function: `isAuth`.
 * Cookie se JWT verify karke `req.id` set karta hai; invalid token par 401 deta hai.
 * Example: `isAuth(actual arguments);`
 */
export const isAuth = (req, res, next) => {
    try {
                const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

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