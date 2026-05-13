import axios from "axios";

const API_URL =
  "https://team-task-manager-xltd.onrender.com/api/auth/users";



export const getUsers =
  async () => {

    const response =
      await axios.get(API_URL);

    return response.data;
  };