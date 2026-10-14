//think of router as a mini express application that contains only the todo-related routes
const express = require("express");
const todo = require("../data/todo");
const router = express.Router();
const {getTodos} = require("../controllers/todocontrollers");
const {getTodosById} = require("../controllers/todocontrollers");
const {postTodos} = require("../controllers/todocontrollers");
const {deleteTodos} = require("../controllers/todocontrollers");
const {updateTodos} = require("../controllers/todocontrollers");
//get router
router.get('/todos' , getTodos);
//get routers with id 
router.get('/todos/:id',getTodosById);
//post request
router.post('/todos' , postTodos);
//delete request
router.delete('/todos/:id', deleteTodos);
//update request 
router.put('/todos/:id' , updateTodos);
//export
module.exports = router;  

/*todoRoutes.js
        ↓ 
"What endpoint?"*/    