import axios from "axios";

const client = axios.create({
  baseURL: "https://www.rbrgs.com/api",
  //baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
