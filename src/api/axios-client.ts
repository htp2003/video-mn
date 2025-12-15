import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://6822181ab342dce8004d1811.mockapi.io/",
});

export default axiosClient;
