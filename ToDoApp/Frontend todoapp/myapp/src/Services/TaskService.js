// Import axios library for making HTTP requests
import axios from "axios";

// Define base URL for REST API
const REST_API_BASE_URL = "http://localhost:8080/todoapp/tasks";

// Function to fetch all tasks from the server
export const listTasks = () => axios.get(REST_API_BASE_URL);

// Function to create a new task on the server
export const createTask = (task) => axios.post(REST_API_BASE_URL, task);

// Function to fetch a specific task from the server by its id
export const getTask = (taskId) => axios.get(REST_API_BASE_URL + "/" + taskId);

// Function to update a task on the server with a specific id
export const updateTask = (taskId, task) =>
  axios.put(REST_API_BASE_URL + "/" + taskId, task);

// Function to delete a task from the server by its id
export const deleteTask = (taskId) =>
  axios.delete(REST_API_BASE_URL + "/" + taskId);