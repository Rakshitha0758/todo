/*todoController.js
        ↓
"What should happen?"*/
const db = require("../config/db");
//get all todos
const getTodos = (req,res,next) => {
     db.query("SELECT * FROM todos" , (err,results) => {
        if(err){
            return next(err);
        }
            res.send(results);
     });
};
//get todo by ID
const getTodosById = (req,res,next) => {
    db.query("SELECT * FROM todos WHERE id = ?",
        [req.params.id],
        (err,results) => {
            if(err){
                return next(err);
            }
            if(results.length === 0){
                return res.status(404).send("TODO not found");
            }else{
                res.send(results);
            }
        }
    ); 
};
// post 
const postTodos = (req,res,next) => {
    //title validation 
    if(typeof req.body.title !== "string" || req.body.title.trim() === ""){
        return res.status(400).send("Title is required");
    }
    //status validation 
    if(typeof req.body.status !== "string" || !["pending","completed"].includes(req.body.status.toLowerCase())){
        return res.status(400).send("Status can be either Pending or Completed");
    }
    db.query(
        "INSERT INTO todos (title,status) VALUES (?,?)",
        [req.body.title.trim() , req.body.status.toLowerCase() === "pending" ? "Pending" : "Completed"],
        (err,results) => {
            if(err){
                return next(err);
            }
            res.status(201).json({
                id : results.insertId,
                title : req.body.title.trim(),
                status : req.body.status.toLowerCase() === "pending" ? "Pending" : "Completed"
            });
        }
    );
};
// delete todos
const deleteTodos = (req,res,next) => {
    db.query(
        "SELECT * FROM todos WHERE id = ?",
        [req.params.id],
        (err,results) => {
            if(err){
                return next(err);
            }else if(results.length === 0){
                return res.status(404).send("TODO does not exist");
            }else{
                db.query(
                    "DELETE FROM todos WHERE id = ?",
                    [req.params.id],
                    (err,results) => {
                        if(err){
                            return next(err);
                        }else{
                            return res.status(200).send("TODO successfully deleted");
                        }
                    }
                );
            }
        }
    );
}
// update todos
const updateTodos = (req,res,next) => {
    //title validation
    if(req.body.title !== undefined && (typeof req.body.title !== "string" || req.body.title.trim() === "")){
        return res.status(400).send("Title cannot be empty");
    }
    // status validation 
    if(req.body.status !== undefined && (typeof req.body.status !== "string" || 
        !["pending","completed"].includes(req.body.status.toLowerCase()))) {
            return res.status(400).send("Status must be pending or completed");
        }
    db.query(
        "SELECT * FROM todos WHERE id = ?",
        [req.params.id],
        (err,results) => {
            if(err){
                return next(err);
            }else if(results.length === 0){
                return res.status(404).send("TODO not found");
            }else{
                if(req.body.title !== undefined && req.body.status !== undefined){
                    db.query(
                        "UPDATE todos SET title = ? , status = ? WHERE id = ?",
                        [req.body.title.trim() ,req.body.status.toLowerCase() === "pending"?"Pending":"Completed", req.params.id],
                        (err , results) => {
                            if(err){
                                return next(err);
                            }else{
                               db.query(
                                "SELECT * FROM todos WHERE id = ?",
                                [req.params.id],
                                (err,updatedResults) => {
                                    if(err){
                                        return next(err);
                                    }else{
                                        return res.status(200).json(updatedResults[0]);
                                    }
                                }
                               );
                            }
                        }
                    );
                }else if(req.body.title !== undefined && req.body.status === undefined){
                    db.query(
                        "UPDATE todos SET title = ? WHERE id = ?",
                        [req.body.title.trim() , req.params.id],
                        (err,results) => {
                            if(err){
                                return next(err);
                            }else{
                                db.query(
                                    "SELECT * FROM todos WHERE id = ?",
                                    [req.params.id],
                                    (err,updatedResults) => {
                                        if(err){
                                            return next(err);
                                        }else{
                                            return res.status(200).json(updatedResults[0]);
                                        }
                                    }
                                );
                            }
                        }
                    );
                }else if(req.body.status !== undefined && req.body.title === undefined){
                    db.query(
                        "UPDATE todos SET status = ? WHERE id = ?",
                        [req.body.status.toLowerCase() === "pending"?"Pending":"Completed" , req.params.id],
                        (err,results) => {
                            if(err){
                                return next(err);
                            }else{
                                db.query(
                                    "SELECT * FROM todos WHERE id = ?",
                                    [req.params.id],
                                    (err,updatedResults) => {
                                        if(err){
                                            return next(err);
                                        }else{
                                            return res.status(200).json(updatedResults[0]);
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
                else{
                    return res.status(400).send("Provide title or status");
                }
            }
        }
    );
}
module.exports = {getTodos,getTodosById, postTodos, deleteTodos, updateTodos};  
