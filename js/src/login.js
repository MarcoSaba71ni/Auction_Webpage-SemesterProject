import { loginUser } from "../api/auth.js";
import { saveToken } from "../storage/local.js";
import { loginError } from "../api/api.js";

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const credentials = {
        email: loginForm.email.value.trim(),
        password: loginForm.password.value.trim()
    }

    // TODO: FORM VALIDATION
    try {
        const response = await loginUser(credentials);
        console.log(response);

        if (credentials.email.length > 0 && !credentials.email.endsWith("@stud.noroff.no")) {
            const emailAlert = document.getElementById('email-alert');
            emailAlert.style.display = 'block';
        return; 
    }

        if (response.data?.accessToken) {
            saveToken(response.data.accessToken, {
                name: response.data.name,
                email: response.data.email
            });
            window.location.href = "../index.html";
        }
        
        if (response.errors?.length) {
            loginError(response.errors[0].message);
            console.log(response.errors[0].message);
            alert("Error with credentials. Try again.");
        }



    } catch (error) {
        console.log(error?.message);
    }

    // TODO: ERROR HANDLING

})