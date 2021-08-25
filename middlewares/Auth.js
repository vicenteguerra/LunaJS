jwt = require('jsonwebtoken');

let AuthMiddleware = function(){
    this.authenticationJWT = authenticationJWT;
};

let authenticationJWT = async function (req, res, next){
    const bearerHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!bearerHeader){
        return res.sendStatus(401);
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    try {
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded
        return next();
    } catch(err) {
        return res.sendStatus(401);
    }
}

exports.AuthMiddleware = new AuthMiddleware();
