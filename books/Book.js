const mongoose = require("mongoose");

mongoose.model("Book", {
    //ID, Title, Author, Publisher, Edition
    ID:{
        type:Number,
        require:true
    },
    title:{
        type: String,
        reqiure: true
    },
    author:{
        type:String,
        require:true
    },
    publisher:{
        type:String,
        require:true
    },
    edition:{
        type:String,
        require:false
    }
});