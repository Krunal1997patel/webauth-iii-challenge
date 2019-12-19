const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(authorization){
        const secret = process.env.JWT_SECRET || ' this is a secret, you are not support to know'

        jwt.verify(authorization, secret, function(err, decodedToken){
            if(err){
                res.status(401).json({
                    message: 'wrong token'
                })
            }else{
                req.token = decodedToken;

                next()
            }
        })
    }else{
        res.status(400).json({
            message: 'you are not login'
        })
    }
}