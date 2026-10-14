require("./config/db");
const express = require("express");
const app = express();
app.use(express.json()); // middleware to parse the req body 
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
//import routes
const todoRoutes = require("./routes/todoRoutes");
app.use(todoRoutes);

//error handler middleware
app.use((err,req,res,next) => {
    // handle err 
    console.log(err);
    res.status(500).send("Something went wrong");
})  
