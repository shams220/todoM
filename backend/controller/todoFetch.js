const Todos = require('../models/todo');
const fetchTodo=async(req ,res)=>{
    try{
        const todos = await Todos.find({userId:req.params.userId})
        res.json(todos);
    }catch(error){
        res.status(500).send({
            error:'server error'
        })
    }
}
module.exports = {fetchTodo};