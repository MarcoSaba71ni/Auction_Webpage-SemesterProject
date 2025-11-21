import { loginUser } from "../api/auth.js";


const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const credentials = {
        email: loginForm.email.value.trim(),
        password: loginForm.password.value.trim()
    }

    // TODO: FORM VALIDATION
    const response = await loginUser(credentials);
    if(response.data?.email) {
        alert("Succesful Login");
        window.location.href = '../../pages/login.html';
    }
    //TODO: ERROR HANDLING

})