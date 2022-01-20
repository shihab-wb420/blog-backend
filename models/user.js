const mongoose = require('mongoose');

// user schema
const userScheama = new mongoose.Schema(
  { 
    name: {
      type: String,
      trim: true,
      default:""
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      trim:true
    }, 
    userImage:{
       type:String,
       default:"default_profile2.png"
    }, 
   
  }, {timestamps:true}
  
);


module.exports = mongoose.model('User', userScheama);
