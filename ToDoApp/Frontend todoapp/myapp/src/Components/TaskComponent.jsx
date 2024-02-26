// Import necessary modules from React and react-router-dom
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import functions for creating, updating, and fetching tasks from TaskService
import { createTask, getTask, updateTask } from "../Services/TaskService";

// Import CSS file
import "../App.css";

// Define functional component TaskComponent
const TaskComponent = () => {
  // Define state variables for title, description, completed status, and errors
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");

  // Function to update completed status
  const handleCompleted = (e) => setCompleted(e.target.value);

  // State variable for form validation errors
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    completed: "",
  });

  // Get task id from URL params and navigate function from react-router-dom
  const { id } = useParams();
  const navigator = useNavigate();

  // Effect hook to fetch task details when id changes
  useEffect(() => {
    getTask(id)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Function to save or update task based on form submission
  function saveOrUpdateTask(e) {
    e.preventDefault();

    // Validate form fields
    if (validateForm()) {
      // Create task object with title, description, and completed status
      const task = { title, description, completed };

      // Log task details and stop function execution if validation fails
      console.log(task);

      // If task id exists, update task; otherwise, create new task
      if (id) {
        updateTask(id, task)
          .then((response) => {
            console.log(response.data);
            navigator("/tasks");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createTask(task)
          .then((response) => {
            console.log(response.data);
            navigator("/tasks");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  // Function to validate form fields and update errors state
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    // Validate title field
    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      errorsCopy.title = "Title is required";
      valid = false;
    }

    // Validate description field
    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "Description is required";
      valid = false;
    }

    // Validate completed status field
    if (completed.trim()) {
      errorsCopy.completed = "";
    } else {
      errorsCopy.completed = "Completed status is required";
      valid = false;
    }

    // Update errors state
    setErrors(errorsCopy);

    return valid;
  }

  // Function to render page title based on whether task id exists
  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Tasks</h2>;
    } else {
      return <h2 className="text-center">Add Tasks</h2>;
    }
  }

  // Return JSX for TaskComponent
  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 ">
          {/* Render page title */}
          {pageTitle()}
          <h2 className="text-center"></h2>
          <div className="card-body">
            {/* Task form */}
            <form>
              {/* Title input */}
              <div className="form-group mb-2">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  placeholder="Enter Task title"
                  name="title"
                  value={title}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* Error message for title */}
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              {/* Description input */}
              <div className="form-group mb-2">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  placeholder="Enter Task Description"
                  name="description"
                  value={description}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* Error message for description */}
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Completed status input */}
              <div className="form-group mb-2">
                <label className="form-label">Task Completed Status </label>
                <input
                  type="text"
                  placeholder="Enter Yes or No"
                  name="completed"
                  value={completed}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={handleCompleted}
                />
                {/* Error message for completed status */}
                {errors.completed && (
                  <div className="invalid-feedback">{errors.completed}</div>
                )}
              </div>

              {/* Submit button */}
              <button className="btn btn-success" onClick={saveOrUpdateTask}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export TaskComponent
export default TaskComponent;