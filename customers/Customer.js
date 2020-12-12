const mongoose = require("mongoose")

mongoose.model('Customer', {
   membership_id: {
       type: Number,
       require:true
   }, 
   
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: false
    }

});