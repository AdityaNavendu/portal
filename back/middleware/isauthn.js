import jwt from "jsonwebtoken";

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