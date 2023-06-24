require('dotenv').config()


const jwt = require('jsonwebtoken');
const fs = require('fs')
const { API_GATEWAY_PUBLIC_KEY } = process.env;

module.exports = async (req, res, next) => {

    // Load public key from environment variable
    const publicKey = fs.readFileSync(API_GATEWAY_PUBLIC_KEY);

    try {
        const decoded = jwt.verify(req.body.token, publicKey, { algorithm: 'RS256' } );
        req.body = decoded
        next()

    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}