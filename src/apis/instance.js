import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

baseUrl.interceptors.request.use(
  (config) => {
    // Lấy token từ cookie hoặc localStorage
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXB0YWluIHRlZW1vIiwiZXhwIjoxNzQxOTU4MzY5fQ.1Of-MbHoNod4LsLOiEk-UPU-vkWTK2q24PgRDBhdG7PYP_o2D5cRf_QAd5oDwKYttchokok7QEGxytr9j1TrSQ";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseUrl;
