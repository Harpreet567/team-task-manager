import axios from "axios";

const API_URL =
  "http://localhost:5000/api/tasks";



// GET TOKEN
const getToken = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return user?.token;
};



// CREATE TASK
export const createTask =
  async (taskData) => {

    const response =
      await axios.post(

        API_URL,

        taskData,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// GET TASKS
export const getTasks =
  async () => {

    const response =
      await axios.get(

        API_URL,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// Update task status
export const updateTaskStatus =
  async (id, status) => {

    const response =
      await axios.put(

        `${API_URL}/${id}`,

        { status },

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };
  // EDIT TASK
export const editTask =
  async (id, taskData) => {

    const response =
      await axios.put(

        `${API_URL}/${id}`,

        taskData,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// Delete task
export const deleteTask =
  async (id) => {

    const response =
      await axios.delete(

        `${API_URL}/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// Dashboard data
export const getDashboardStats =
  async () => {

    const response =
      await axios.get(

        `${API_URL}/stats`,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };