const mongoose=require("mongoose");

const schema=mongoose.Schema;

const scorecardSchema=new schema({
    teamName:{
        type:String,
    },
    batsmanName:{
        type:String,
    },
    runs:{
        type:String,
    },
    balls:{
        type:String,
    },
    fours:{
        type:String,
    },
    sixes:{
        type:String,
    },
    sr:{
        type:String,
    },
    venue:{
        type:String,
    },
    date:{
        type:String,
    },
    result:{
        type:String,
    }
});

const db=mongoose.model("teams",scorecardSchema);

module.exports=db;
