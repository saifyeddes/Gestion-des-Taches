import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
=======
  baseURL: "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632
});

export default instance;
