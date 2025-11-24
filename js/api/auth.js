import {apiPost , apiGet} from "./api.js";

export async function registerUser(userData) {
    return await apiPost('/auth/register', userData)
}

export async function loginUser (credentials) {
    return await apiPost('/auth/login', credentials)
}