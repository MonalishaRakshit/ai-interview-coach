/* Here this functions are interact with the api's created in backend */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/* for register */
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

/* for login */
export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

/* for logout */
export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

/* for get-me */
export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
