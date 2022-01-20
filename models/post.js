const mongoose = require('mongoose');

// post schema
const postScheama = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required:true
    },
    category:{
      type: String,
      required: true
    },
    userId:{
      type:String,
    },
    userImage:{
      type:String,
      default:""
    },
    userName:{
      type:String,
      default:""
    }
  }, {timestamp:true}
);


module.exports = mongoose.model('Post', postScheama);
