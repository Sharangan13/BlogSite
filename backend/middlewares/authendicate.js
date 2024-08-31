const ErrorHandler = require("../util/errorHandler");
const catchAsyncError= require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");



// 01. Middleware to check if the user is logged in -------------------------------------------------------------------

exports.isAuthendicatedUser = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Login first handle this resource",401))
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await user.findById(decode.id);
    next()


});


// 02. Middleware to verify if the user has permission to access the resource -------------------------------------------------------------------

exports.authorizeRole =  (...roles) =>{
   return (req,res,next)=>{

    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`you are ${req.user.role} you can't access this`,401))
    }
    next();

    }
}




