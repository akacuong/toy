const mongoose = require('mongoose');
var AccountSchema = mongoose.Schema(
    {
        username:{
         type: String,
        required: [true, 'Username is required']
        },
        password:{
            type: String,
           required: [true, 'Password is required']
           },
    }
);
var AccountModel = mongoose.model('accounts',AccountSchema)
module.exports=AccountModel;
