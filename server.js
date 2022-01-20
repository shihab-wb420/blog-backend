const express = require('express')
const app = express()
const cors = require('cors')
const User = require("./models/user")
const Post = require("./models/post")
const Comment = require("./models/postComment")
const userProfile = require("./models/profile")
const multer = require('multer')
const mongoose = require("mongoose")
const port = process.env.PORT || 8000
require('dotenv').config()

app.use(express.json());
app.use(express.static(__dirname+"./images/"))
app.use(cors());

//----multer file storage setup-------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.././client/public/images/',)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

// Connect to database
const connectDB = require("./db")
connectDB();


//-----Register ApI-----
app.post('/register', async (req, res,next) => {
try{ 
  let email = req.body.email;
  let userExist = await User.findOne({email})
   if(userExist){
     res.send({error:" email alredy exist,  please log in or use another email"})
    }else{
     let user = new User(req.body);
     let result = await user.save();
     result = result.toObject();
     delete result.password;
     res.send(result);
     console.log("Registration Succesfull...");
    }
    }catch(err){
      res.send("error occurd")
       console.log("error Regestration ", err)
    }
  
})

//-----Login Api -------
app.post("/login", async (req,res)=>{
  try{
   let email = req.body.email;
   let password = req.body.password;
   if(email && password){
      let user = await User.findOne({email});
     
    if(user){
      res.send(user);
      console.log("user login---")
     }else{
      res.send({error:"user not found, login faild"});
      console.log("user not found, login faild");
     }
   }else{
     res.send({error:"user not found, login faild"});
     console.log("user not found,");
   }
}catch(err){ 
  res.send("error occurd")
  console.log(err)
}
})

//----Publish Post ApI-----
app.post("/publish_post", async (req,res) =>{
  try{
    let newPost = new Post(req.body)
    newPost = await newPost.save()
   // console.log(newPost)
    res.send(newPost)
    
  }catch(err){
    res.status(401).json({error:"post not publish"})
    console.log("post not publish")
  }
})

//----Fetch private post by user Id--------
app.get("/get_private_post/:id", async (req,res) =>{
  try{
    let userId = req.params.id;
    let posts = await Post.find({userId})
    //console.log("private posts",posts)
    res.send(posts)
  }catch(err){
    res.status(401).json({error:"private post not found"})
    console.log("private post not found")
  }
})

//----Fetch public post --------
app.get("/get_public_posts", async (req,res) =>{
  try{
    let posts = await Post.find({});
    //console.log("public post found", posts)
    res.send(posts)
  }catch(err){
    res.status(401).json({error:"public post not found"})
    console.log("public post not found")
  }
})

//----Fetch public single post by post id--------
app.get("/get_public_single_post/:id", async (req,res) =>{
  try{
    let id = req.params.id;
    let posts = await Post.findOne({_id:id});
  //  console.log("public Single Post Found", posts)
    res.send(posts)
  }catch(err){
    res.status(401).json({error:"public single post not found"})
    console.log("public single post not found")
  }
})

//----Publish post Comments in individual post--------
app.post("/publish_comment", async (req,res) =>{
  try{
    let newComment = new Comment(req.body)
    newComment = await newComment.save()
   // console.log("comment publish", newComment)
    res.send(newComment)
  }catch(err){
    res.status(401).json({error:"Comment not publish"})
    console.log("Comment not publish")
  }
})

//----Fetch post comments by post id in individual post--------
app.get("/get_comments/:id", async (req,res) =>{
  try{
    let id = req.params.id;
    let comments = await Comment.find({postId:id});
   // console.log("comments found", comments)
    res.send(comments)
  }catch(err){
    res.status(401).json({error:"comment not found"})
    console.log("comment not found")
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
