const mongoose = require("mongoose");
const validator =require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto  = require("crypto");


// Defining a Mongoose schema for the user

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter user name"]
    },

    email:{
        type:String,
        required:[true,"Please enter email address"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
     password:{
        type:String,
        required:[true,"Please enter password"],
        select:false
     },

     avatar:{
        type:String,

     },
     
     role:{
        type:String,
        default:'user'
     },
     resetPasswordToken:{
        type:String
     },

     resetPasswordTokenExpire:{
        type:Date
     },

     createdAt:{
        type:Date,
        default:Date.now
     }

})


// Middleware to hash the password before saving it
userSchema.pre('save', async function (next) {

   // Hash the password only if it's modified or new
   if (!this.isModified('password')) {
       return next();
   }

   try {
       const salt = await bcrypt.genSalt(12);
       this.password = await bcrypt.hash(this.password, salt);
       next();
   } catch (error) {
       return next(error);
   }
});



userSchema.methods.getJwtToken = function(){
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRES });
}


// Method to validate entered password against stored hashed password
userSchema.methods.isValidPassword = async function(enteredPassword){
   return  bcrypt.compare(enteredPassword,this.password)
}


// Method to generate and return a reset password token  
userSchema.methods.getResetToken = function(){
   // Generate Token
   const passwordResetToken = crypto.randomBytes(20).toString('hex');

   // Generate Hash and set to passwordResetToken
   this.resetPasswordToken = crypto.createHash('sha256').update(passwordResetToken).digest('hex');

   //set Token expire Time - 5min
   this.resetPasswordTokenExpire = Date.now() + 5*60*1000 ;

   return passwordResetToken;


}


const userSchemaModel = mongoose.model('user',userSchema);          // Creating a Mongoose model from the schema

module.exports = userSchemaModel;