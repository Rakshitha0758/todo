/*todoController.js
        ↓
"What should happen?"*/
const todo = require("../data/todo");
const getTodos = (req,res) => {
     res.send(todo);
};
module.exports = {getTodos};  