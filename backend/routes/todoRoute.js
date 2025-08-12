const express = require('express');
const { todoController, editTodo ,deleteTodo} = require('../controller/todoController');
const { getTodo } = require('../controller/todoController')

const { auth } = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');
const adminMiddleware = require('../middleware/adminMiddleware')
const r = express.Router();

r.post('/create',auth,todoController);
r.get('/getTodo',auth, getTodo );
r.put('/updateTodo/:Id',auth,editTodo)
r.delete('/deleteTodo/:Id',auth,deleteTodo);
r.get('/admin',auth,adminMiddleware,adminController);

module.exports = r;