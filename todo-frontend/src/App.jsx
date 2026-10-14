import { useState } from "react";  
function App(){ 
  const[tasks, setTasks] = useState([]);
  const[taskInput , setTaskInput] = useState("");
  return (
    <div>
      <h1>My Todo app</h1>
      <h2>Tasks added = {tasks.length}</h2> 
      <input
         type = "text"
         value = {taskInput}
         onChange={(e) => setTaskInput(e.target.value)}
         placeholder="Enter a task"
      /> 
       <button   onClick={() => {
        if(taskInput.trim() == ""){
          return;
        }
          setTasks([...tasks, taskInput]);
          setTaskInput("");
        }}
       >Add tasks
       </button>
      {tasks.map((task,index) => (
        <p key = {index}>{task}</p>
      ))}
    </div>
  )
} 
export default App;  