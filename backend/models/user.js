const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { timeStamp } = require('console');


const UserSchema = new mongoose.Schema({


   name:{
       type:String,
       required:[true,"Please enter a password"]
   },

   avatar:{
       public_id:String,
       url:String
   },

   email:{
       type:String,
       required:[true,"Please enter a email"],
       unique:[true,"Email already exit"]
   },

   password:{
       type:String,
       required:[true,"Please enter a password"],
       minlength:[6,"Password must have atleast 6 charachter"],
       select:false
   },

   posts:[
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Post"
       },
   ],

   followers:[
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
       },
   ],

   following:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }, 
],

    resetPasswordToken:String,

    resetPasswordExpires:Date


});


UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});



UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

UserSchema.methods.generateToken =  function(){
    return  jwt.sign({_id:this._id},process.env.JWT_SECRET)
};

UserSchema.methods.getResetPasswordToken =  function(){

    const resetToken = crypto.randomBytes(20).toString('hex');
    
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 10*60*1000;

    return resetToken;

}


module.exports = mongoose.model("User",UserSchema);
