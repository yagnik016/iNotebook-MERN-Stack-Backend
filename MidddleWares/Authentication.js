const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY
const Authentication =(req,res,next)=>{
const token = req.headers["auth-token"]
if(!token){
    return res.status(401).send("UnAuthorized! Access Denied")
}
try {
    const data = jwt.verify(token,SECRET_KEY)
    req.user = data
    console.log(data)    
    next()
} catch (error) {
    return res.status(500).send(error)
}

}
module.exports = Authentication