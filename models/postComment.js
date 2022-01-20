const mongoose = require('mongoose');

// post schema
const CommentScheama = new mongoose.Schema(
  {
   
    comment: {
      type: String,
      trim: true,
      required:true
    },
   userName:{
        type: String
      },
     postId:{
        type:String,
        required:true
      },
    userId:{
      type:String,
    },
    userImage:{
      type:String,
      default:""
    }
  }, {timestamp:true}
);


module.exports = mongoose.model('Comment', CommentScheama);
