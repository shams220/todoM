const mongoose  = require('mongoose');
const todoSchema = new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isComplete:{
        required:true,
        type:Boolean,
        default:false
    }
})

const todoModel = mongoose.model('todo',todoSchema);
module.exports = todoModel;