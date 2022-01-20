const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try{
    const connection = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
      // useCreateIndex: true,
       //useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  }
  catch(e){
    console.log("mongodb not connectted",e);
    
  }
}; 

module.exports = connectDB;