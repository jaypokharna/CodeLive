const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)

const roomSchema = new Schema({

    roomId : {
        type : String , 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    code : {
        type : String
    }

})

module.exports = mongoose.model('Room' , roomSchema)