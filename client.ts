import axios from "axios";

const client = axios.create({
  baseURL: "http://robo-links.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
