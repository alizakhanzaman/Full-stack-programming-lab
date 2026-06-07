//Axios instance: used by ALL CRUD pages(frontend) to talk to backend
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

// This runs BEFORE every API request automatically
// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("crm_token");
    if (token) 
    {
      config.headers.Authorization = `Bearer ${token}`;
      // Adds: "Authorization: Bearer eyJhbGci..." to every request
    }
  }
  return config;
});

export default API;
