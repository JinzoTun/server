import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const protectRoute = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
