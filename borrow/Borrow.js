const mongoose = require('mongoose')

mongoose.model("Borrow", {
    CustomerID:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true

    },
    DateBorrowed: {
        type: Date,
        require:true
    },
    ExpectedReturn:{
        type:Date,
        require:true
    }
})