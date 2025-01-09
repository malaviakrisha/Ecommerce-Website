import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next(); 
    } catch (error) {
        console.error("Token verification error: ", error);
        return res.status(403).json({ success: false, message: "Token is not valid" });
    }
};

export default authMiddleware;
