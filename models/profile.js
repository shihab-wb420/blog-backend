const mongoose = require('mongoose');

//const current= Math.floor(Date.now() / 1000) 
/*const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};*/
// post schema
const profileScheama = new mongoose.Schema(
  {
    name:String,
    profileImage:String,
    userId:{
      type:String,
    },
    date:{
      type: Date,
      default: Date.now
    }
  }, {timestamps:true}

);


module.exports = mongoose.model('userProfile', profileScheama);
