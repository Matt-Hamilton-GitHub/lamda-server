const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
}