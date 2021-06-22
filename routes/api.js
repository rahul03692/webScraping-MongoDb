const express=require("express");
const router=express.Router();

const db=require("../models/schema");

router.get("/",(req,res,next)=>{
    db.find({}).then((data)=>{
        res.send(data);
    }).catch(next);
});

router.post("/",(req,res,next)=>{
    db.create(req.body).catch(next);
});

module.exports=router;