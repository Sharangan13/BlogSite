const { put } = require('@vercel/blob'); 
const { AsyncLocalStorage } = require("async_hooks");
const catchAsyncError = require("../middlewares/catchAsyncError");
const userModel =require("../models/userModel");
const sendEmail = require("../util/email");
const ErrorHandler = require("../util/errorHandler");
const sendToken = require("../util/jwtken");
const crypto  = require("crypto");
const { strict } = require("assert");



// 01. Register User    URL- http://localhost:8000/api/sh/register    -------------------------------------------------------------------

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let avatar;

    // Check for the upload token
    const uploadToken = "vercel_blob_rw_lUSA2go8ipySDpex_w6tss9owH4MW6R9MMQNpNOMIghabA3";
    if (!uploadToken) {
        console.error("Upload token not found!");
        return next(new ErrorHandler("Upload token is missing", 500));
    }

    try {
        // If there is a file uploaded, upload it to Vercel Blob storage
        if (req.file) {
            console.log("Uploading avatar:", req.file.originalname);

            // Upload the avatar to Vercel Blob storage
            const upload = await put(req.file.originalname, req.file.buffer, { access: 'public', token: uploadToken });
            avatar = upload.url;  // Set the avatar URL from the uploaded file

        } else {
            avatar = ""; // Default avatar URL or leave empty if no file is uploaded
        }

        // Create the new user with avatar URL
        const newUser = await userModel.create({
            name,
            email,
            password,
            avatar, // Store the uploaded avatar URL
        });

        // Send token for the new user
        sendToken(newUser, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            const message = `This ${Object.keys(err.keyValue)[0]} is already used, please enter another ${Object.keys(err.keyValue)[0]}`;
            return next(new ErrorHandler(message, 400));
        }
        return next(new ErrorHandler(err.message, 500));
    }
});




// 02. Login user    URL - http://localhost:8000/api/sh/login    -------------------------------------------------------------------

exports.loginUser = catchAsyncError(async(req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Plesae enter valid email & password", 400) )
    }


    // finding the user details from databse
    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler("Invalid email or password",401));

    }

    sendToken(user, 201, res)

});




// 03. Logout User     URL - http://localhost:8000/api/sh/logout    -------------------------------------------------------------------

exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite: 'None',
        domain: '.blog-site-two-tau.vercel.app',
        path: '/',
    }).status(200).json({
        success:true,
        message:"Logout Succesfully"
    })
}




// 04. Forgot Password    URL - http://localhost:8000/api/sh/password/forgot     -------------------------------------------------------------------

exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
    const user = await userModel.findOne({email:req.body.email})
    
    if(!user){
        return next(new ErrorHandler("user not found", 404))
    }

    const resetToken = user.getResetToken();

    await user.save({validateBeforeSave:false})


    //create reset URL

    let BASE_URL=process.env.FRONTEND_URL;
    if(process.env.NODE_ENV==="production"){
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    const resetURL = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset URL is as follows ${resetURL}`;

    try{

        sendEmail({
            email:user.email,
            subject:"Reset your Password",
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })


    }catch(error){
        user.resetPasswordToken= undefined;
        user.resetPasswordTokenExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next (new ErrorHandler(error.message),500)
    }
})  





// 05. Reset Password    URL - http://localhost:8000/api/sh/password/reset/:token   -------------------------------------------------------------------

exports.resetPassword = catchAsyncError(async (req,res,next)=>{

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    
    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt:Date.now()
        }

    })

    if(!user){
        return next( new ErrorHandler("Password reset token is invalid or expired"))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next( new ErrorHandler("Password does not match"))
    }

    user.password = req.body.password
    user.resetPasswordToken=undefined;
    user.resetPasswordTokenExpire=undefined;
    await user.save({validateBeforeSave:false})

    sendToken(user,201,res)

})





// Get User Profile     URL - http://localhost:8000/api/sh/myprofile

exports.getUserProfile = catchAsyncError( async(req, res, next)=>{
   const user = await userModel.findById(req.user.id)
   res.status(200).json({
    success:true,
    user
   })

})





// Change Password    URL - http://localhost:8000/api/sh/password/change

exports.changePassword = catchAsyncError(async (req,res,next)=>{
    const user = await userModel.findById(req.user.id).select('+password')

    // chaeck old password
    if(! await user.isValidPassword(req.body.oldPassword)){
        return next( new ErrorHandler("Old password is Incorrect",401))

    }

    // assigning new password
    user.password=req.body.password
    await user.save();
    res.status(200).json({
        success:true,
        message:"Password updated"
       })



})




// Update User Profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    // Prepare new user data
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // Check for the upload token
    const uploadToken = "vercel_blob_rw_lUSA2go8ipySDpex_w6tss9owH4MW6R9MMQNpNOMIghabA3";
    if (!uploadToken) {
        console.error("Upload token not found!");
        return next(new ErrorHandler("Upload token is missing", 500));
    }

    try {
        // Handle avatar upload if a file is provided
        if (req.file && req.file.buffer) {
            console.log("Uploading avatar:", req.file.originalname);

            // Upload the avatar to Vercel Blob storage
            const upload = await put(req.file.originalname, req.file.buffer, {
                access: 'public',
                token: uploadToken
            });

            // Store the URL of the uploaded image in newUserData
            newUserData.avatar = upload.url;
        }

        // Update user profile with the new data
        const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
        });

        // Send response
        res.status(200).json({
            success: true,
            message: 'Profile updated',
            user,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return next(new ErrorHandler("Image upload failed", 500));
    }
});







// ----------------------------------SUPER ADMIN FUNCTIONS---------------------------------------  //





// Admin -  Get All Users

exports.adminGetAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await userModel.find();
    res.status(200).json({
        success:true,
        users
       })

})




// Admin -  Get Specific user

exports.adminGetSpecificUser = catchAsyncError(async (req,res,next)=>{
    const user = await userModel.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
       })

})




// Admin -  Admin Update user details

exports.adminUpdateUserDetails = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await userModel.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        message:"Profile updated",
        user
       })
})




//Admin -  Delete user

exports.adminDeleteUser = catchAsyncError(async (req,res,next)=>{
    const user = await userModel.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }

    await user.deleteOne();
    res.status(200).json({
        success:true,
        message:"User sucessfully deleted"
    })

})