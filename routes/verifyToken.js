const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SEC_TOKEN, (err, user )=>{
            if(err) return res.status(401).json("Authentication failed, not valid token");
            req.user = user;
            next();
        })
    }else{
      return res.status(401).json("Authentication failed, no token");
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req, res, next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();  
        }else{
           res.status(403).json('UPDATING DATA IS NOT PERMITTED');
        }
        
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req, res,()=>{
        if(req.user.isAdmin){
            next();  
        }else{
           res.status(403).json('UPDATING DATA IS NOT PERMITTED');
        }
        
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};