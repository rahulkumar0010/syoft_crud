const mongoose = require("mongoose");
const { MONGO_URL } = require(".");

function DBConnect(){
mongoose.connect(MONGO_URL)
const db= mongoose.connection;
db.once("open",function(){
    console.log("DB Connection successfully")
})
db.on("error",(error)=> console.error.bind(error))
}

module.exports= DBConnect