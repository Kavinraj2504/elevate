const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,"123456");
        const user = await User.findById(decoded.id).select('-password');
        console.log(user)

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        req.user =user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
