import axios from "axios";
import { get_Token } from "../utils/Helper";
export default axios.create({
  // baseURL: "https://9a42-49-249-44-114.in.ngrok.io/api/v1/", //sumit
  // baseURL: "https://c3ae-49-249-44-114.in.ngrok.io/api/v1/", //shivam
  // baseURL: "https://4bea-49-249-44-114.in.ngrok.io/api/v1", //Anand
  baseURL: "https://lightbulb-core-app-be.antino.ca/api/v1/", //live
});

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `bearer ${get_Token()}`;
  return config;
});
