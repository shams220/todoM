const mongoose = require('mongoose');
const connectDB =  async()=>{
    try{
const con  = await mongoose.connect("mongodb+srv://alamshams8273:chaltehai@cluster0.rjucrm7.mongodb.net/NewTM?retryWrites=true&w=majority&appName=Cluster0");
console.log("✅ MongoDb connected succesfully");
    }catch(error){
        console.log("  ❌wrong connection"+error.message);
    }
}
module.exports = connectDB;