const mysql = require("mysql2");
// connection object 
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Rakshitha@09",
    database : "todo_db"
});
db.connect((err) => {
    if(err){
        console.log("Database connection failed");
    }else{
        console.log("Database connected successfully");
    }
});
module.exports = db;