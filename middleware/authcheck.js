const jwt = require('jsonwebtoken')


exports.isAuth = (req,res,next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) throw new Error("No Auth Found")
    const token = req.get('Authorization').split(' ')[1]
    let decodedtoken;
    try {
       
        decodedtoken = jwt.verify(token , "k4m4lS4m1rEl3w1")
    } catch (error) {
        console.log(error)
        throw error
        
    }
    if(!decodedtoken) throw new Error("No Authontication");
            req.eid = decodedtoken.eid,
            req.dir = decodedtoken.dir,
            req.token = token,
            req.isLogin = decodedtoken.isLogin,
            req.approvedDir = decodedtoken.approvedDir,
            req.approvedAddress = decodedtoken.approvedAddress
            req.permission = decodedtoken.permission
            
    next()
}


exports.isSign = (req,res,next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) throw new Error("No Auth Found")
    const token = req.get('Authorization').split(' ')[1]
    let decodedtoken;
    try {
       
        decodedtoken = jwt.verify(token , "k4m4lS4m1rEl3w1")
    } catch (error) {
        console.log(error)
        throw error
        
    }
    if(!decodedtoken) throw new Error("No Authontication");
            req.eid = decodedtoken.eid,
            req.dir = decodedtoken.dir,
            req.uname = decodedtoken.uname
            req.uid = decodedtoken.uid
            
    next()
}