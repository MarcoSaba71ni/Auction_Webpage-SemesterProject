import {API_BASE , API_KEY} from "../utils/constants.js";


export async function apiGet( endpoint, token = null) {

    const options = {
        headers : {
            "Content-Type" : "application/json",
            "X-Noroff-API-Key": API_KEY,
            // What about the token?
        }
    }      
     if (token) {
            options.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("Token not added");
        }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();
    
    //handle error
    return data;
  
}

export async function apiPost(endpoint, data, token = null) {
    const options = {
        headers : {
            'Content-Type' : 'application/json',
            "X-Noroff-API-Key": API_KEY,
        },
        method : "POST",
        body: JSON.stringify(data)
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Token not added")
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options,);
    const result = await response.json();
    return result;

    //  current poor error handling!
    if(!response.ok) {
        console.log(error);
    }

}

export async function apiDelete () {

}


export async function loginError(response) {
    const invalidLogin = document.getElementById('span-invalid-login');
    const message = response?.errors?.[0]?.message || "Invalid Email or Password";    
    invalidLogin.textContent = message;
    invalidLogin.style.display = 'block';
}

export async function registerError (response) {
    const invalidRegister = document.getElementById('span-invalid-register');
    const message = response?.errors?.[0]?.message || "Invalid Email or Username"; 
    invalidRegister.textContent = message;
    invalidRegister.style.display = 'block';
}