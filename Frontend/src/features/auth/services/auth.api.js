import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const sanitizedBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;

const api= axios.create({
    baseURL: `${sanitizedBaseURL}/api/auth`,
    withCredentials: true
});


export async function register({ username, email, password }) {
    try {
        const response = await api.post("/register", { username, email, password });
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await api.get("/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/get-me", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}