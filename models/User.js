const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Createdby_Yagnik_At:{
        type:Date,
        default:Date.now
    }
    })
    module.exports = mongoose.model('User',UserSchema)