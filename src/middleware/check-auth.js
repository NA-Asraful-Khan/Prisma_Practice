const jwt = require('jsonwebtoken')

function checkAuth(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        req.userData = decodedToken
        next()
    }catch(error){
        return res.status(501).json({
            "message": "Invalid or UnAutorized Token",
            "error": error
        });

    }
}


module.exports = {
    checkAuth
}