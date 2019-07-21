const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(token);
    
    if(!token){
        return res.status(403).send({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.SECRETE_KEY);
        req.decoded = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "unauthorized access"
        })
    }
};