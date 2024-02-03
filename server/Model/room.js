const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://jayp:2012@cluster0.ozimw5y.mongodb.net/codelive")

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