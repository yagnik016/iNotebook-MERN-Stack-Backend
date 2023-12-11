const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/my-inotebook"
const connectToMongo = ()=>{
    mongoose.connect(URL)
    console.log("Connected to MongoDB Database")
}
module.exports = connectToMongo