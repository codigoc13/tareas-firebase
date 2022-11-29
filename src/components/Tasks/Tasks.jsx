import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { getCollection } from "../../Helpers/Actions";
import "./Tasks.css";


const Tasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async ()=>{
        const result=await getCollection("tasks")
        result.statusResponse&&setTasks(result.data)
    })()
  }, [])
  
  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <h4 className="text-center">Lista de tareas</h4>
          {
            size(tasks)===0? (<h4>No hay tareas</h4>):(
                <ul className="list-group">
                    {
                        tasks.map((taskInfo)=>
                        (<li className="list-group-item" key={taskInfo.id}>
                            <span className="lead">
                                {taskInfo.name}
                            </span>
                        </li>))
                    }
                </ul>
            )
          }
        </div>
        <div className="col-md-4 col-sm-12">
          <h4>{editMode ? "Modificar Tarea" : "Agregar Tarea"}</h4>
          <form >
            <textarea
              type="input"
              placeholder="Ingrese tarea..."
              className="form-control input-task"
              onChange={(e)=>setTask(e.target.value)}
              value={task}
            />
            <button
              type="submit"
              className={
                editMode
                  ? "btn btn-warning w-100 mt-2"
                  : "btn btn-dark w-100 mt-2"
              }
            >
              {editMode ? "Guardar Tarea" : "Agregar Tarea"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
