const mongoose =require('mongoose')
const modelTodo = require('../models/todo');
const Todo = require('../models/todo')

const todoController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const isComplete = req.body.isComplete ?? false;

    // Use the decoded userID from the JWT
    const createdBy = req.user.userID;

    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please enter all details"
      });
    }

    const todo = new modelTodo({
      title,
      description,
      isComplete,
      createdBy
    });

    const result = await todo.save();
    console.log("✅saved: "+result)
    return res.status(200).send({
      success: true,
      message: "todo saved !!😊",
      result
    });
  } catch (error) {
    console.log("Error:" + error.message);
    return res.status(400).send({
      success: false,
      message: `Error: ${error.message}`
    });
  }
}

//DELETE TODO

const deleteTodo=async(req ,res)=>{
    try{
        const todoId = req.params.Id
        console.log("todoID: "+todoId);

        const userId = req.user.userID;
        console.log("userID: "+userId);
        const deletetTodo = await Todo.findOneAndDelete({_id:todoId,createdBy:userId})
        if(!deletetTodo){
            return res.status(500).send({
                success:false,
                message:`not deleted`,

            })
        }
        return res.status(200).send({
            success:true,
            message:`deleted`,
            deletetTodo
        })
    }catch(error){
        console.log("Error"+error.message)
return res.status(401).send({
    success:false,
    message:"some error",
    Error:error.message
})
    }
}

const getTodo = async(req,res)=>{
    try{
const user = req.user
if(!user){
    return res.status(500).send({
        success:false,
        message:"unable to fetch User details"
    })
}else{ 

const userTODO = await Todo.find({createdBy:user.userID})
console.log(userTODO);
return res.status(200).send({
    success:true,
    message:"userFound",
    user,
    userTODO
})
    }
    }
    catch(error){
        console.log(`Error:${error.message}`)
        return res.status(401).send({
            success:false,
            message:"didnt find the user ❌",
            Error:error.message
        })
    }
}
const editTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate( req.params.Id,
      {
        title: req.body.title,
        description: req.body.description,
      }
      ,
      { new: true, runValidators: true }
    );

    return res.status(200).send({
      success: true,
      message: "Todo updated",
      updatedTodo,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating Todo",
      error: error.message,
    });
  }
};


module.exports = { todoController , getTodo ,editTodo,deleteTodo };
