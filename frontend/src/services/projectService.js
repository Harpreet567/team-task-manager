import axios from "axios";

const API_URL =
  "http://localhost:5000/api/projects";



// GET TOKEN
const getToken = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return user?.token;
};



// CREATE PROJECT
export const createProject =
  async (projectData) => {

    const response =
      await axios.post(

        API_URL,

        projectData,

        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };



// GET PROJECTS
export const getProjects =
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



// DELETE PROJECT
export const deleteProject =
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