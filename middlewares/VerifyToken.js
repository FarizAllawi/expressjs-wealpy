require('dotenv').config()


const jwt = require('jsonwebtoken');
const fs = require('fs')

const { API_GATEWAY_PUBLIC_KEY } = process.env;

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing!"});
    }

    const token = authHeader.split(' ')[1];

    // Load public key from environment variable
    const publicKey = fs.readFileSync(API_GATEWAY_PUBLIC_KEY);
    
    try {
        const decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });

        req.user = decoded
        next();

    } catch (err) {
        return res.status(403).json({ message: 'Invalid token or expired' });
    }
}