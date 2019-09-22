const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.header('authHeader');
    if(!token) return res.status(401).send('Access denied. No token provided');
        
    try {
        const decoded = jwt.verify(token,'Root#123');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

module.exports = auth;