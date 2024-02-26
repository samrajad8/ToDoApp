// Import necessary modules from React and react-bootstrap
import React, { useEffect, useState } from "react";
import { deleteTask, listTasks } from "../Services/TaskService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

// Define functional component ListTaskComponent
const ListTaskComponent = () => {
  // Define state variable to store tasks and navigate function
  const [tasks, setTasks] = useState([]);
  const navigator = useNavigate();

  // Effect hook to fetch all tasks when component mounts
  useEffect(() => {
    getAllTask();
  }, []);

  // Function to fetch all tasks from TaskService
  function getAllTask() {
    listTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Function to navigate to add new task page
  function addNewTask() {
    navigator("/add-task");
  }

  // Function to navigate to edit task page with specific id
  function updateTask(id) {
    navigator(`/edit-task/${id}`);
  }

  // Function to remove task with specific id
  function removeTask(id) {
    deleteTask(id)
      .then((response) => {
        getAllTask();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Return JSX for ListTaskComponent
  return (
    <div className="container">
      <h2 className="text-center">List Of Todos</h2>
      {/* Button to add new task */}
      <button
        onClick={addNewTask}
        className=" btn btn-primary mb-2 float-left Addtask"
      >
        Add Task
      </button>
      {/* Table to display tasks */}
      <table className="table table-striped table-bordered">
        <thead className="thead">
          <tr>
            <th>Todo Id</th>
            <th>Todo Title</th>
            <th>Todo Description</th>
            <th>Todo Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through tasks and display each task */}
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed}</td>
              {/* Buttons to update and delete task */}
              <td>
                <button
                  className="btn btn-info up ms-2"
                  onClick={() => updateTask(task.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger up ms-2"
                  onClick={() => removeTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export ListTaskComponent
export default ListTaskComponent;