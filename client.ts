import axios from "axios";

const client = axios.create({
  //baseURL: "https://www.rbrgs.com/api",
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
