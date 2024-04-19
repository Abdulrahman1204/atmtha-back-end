const jwt = require("jsonwebtoken");
const { Subject } = require("../models/Subject");
const { User } = require("../models/User")

// Verify Token between object and code
const verifySubscription = async(req, res, next) =>{

    const oneUser = await User.findById(req.user.id).populate("codes");
    if(!oneUser) {return res.status(400).json({message: "User not found"})}

    console.log(oneUser.codes)
    const codes = oneUser.codes;
    if(oneUser.role === 'admin' || oneUser.role === 'superAdmin'){
        req.isMatch = true;
        next()
    }else if(codes.length === 0) {
        req.isMatch = false;
        next()
    }else{
        const allObjects = await Subject.find( oneUser.codes.subject)
        if(!allObjects.length || allObjects.length === 0 || allObjects === undefined) {return res.status(400).json({message: "Subject not found"})}
    
        const isMatch = allObjects;
    
        console.log("yes");
        if(isMatch){
            req.isMatch = true;
            next()
        }else{
            req.isMatch = false;
            next()
        }
    }


}

module.exports = {
    verifySubscription
}