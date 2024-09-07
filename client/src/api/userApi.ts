import axios from "axios";

export const getUsers = async () => {
    const res = await axios.get(`/api/users`);
    return res.data;
}

export const getUserDetail = async () => {
    const res = await axios.get(`/api/users/:id`);
    return res.data;
  }