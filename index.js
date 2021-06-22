// const fs=require('fs');
// const path=require("path"); 
// const axios = require("axios");

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const getAllMatches = require('./allMatches');

// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";


// axios(url)
//   .then((response) =>{
//       extractHTML(response.data);
//   })
//   .catch((err) => console.log(err.message));


// function extractHTML(html){
//     const {document} = new JSDOM(html).window;

//     const link=document.querySelector('[data-hover="View All Results"]').getAttribute('href');
//     const fullLink="https://www.espncricinfo.com"+link;
    
//     getAllMatches(fullLink);
// }



//--------BACK-END--------//
const express=require("express");
const routes = require("./routes/api");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'});

const app=express();

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true },{ useUnifiedTopology: true })
  .then(() => console.log("DB successful"));


//mongoose.connect("mongodb://localhost:27017/db");

app.enable("trust proxy");

app.use(express.json());
app.use("/",routes);


app.use((err,req,res,next)=>{
  res.status(422).send({error:err.message});
});

app.listen(process.env.PORT || 5000,(req,res)=>{
  console.log("server starting at 5000");
});