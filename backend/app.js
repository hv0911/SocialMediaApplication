const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
// for 
const path = require("path")


 if(process.env.NODE_ENV !== "production"){

    require("dotenv").config({path: "backend/config/config.env"});
 }

 //using middleware
 app.use(express.json({limit:"50mb"}));
 app.use(express.urlencoded({limit:"50mb",extended:true}));
 app.use(cookieParser());

 //importing a routes
 const post = require('./routes/post');
 const user = require('./routes/user');

 //using routes
 app.use("/api/v1",post);
 app.use("/api/v1",user);


 // for

 if(process.env.NODE_ENV==='production'){

  app.use(express.static(path.join(__dirname,"../frontend/build")));


  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
  })

 }
  



                       // <-- created on deployment
// app.use(express.static(path.join(__dirname,"../frontend/public/index.html")));

// app.get("*",(req ,res)=>{
//   res.sendFile(path.resolve(__dirname,"../frontend/public/index.html"))
// })



module.exports = app;