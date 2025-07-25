import axios from "axios";

export const waiterServiceApi = axios.create({
  baseURL: 'https://waiter-backend-production.up.railway.app/api', 
  withCredentials: true,
  timeout: 5000,    
});