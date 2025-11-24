
import { registerUser } from "../api/auth.js";

import { registerError } from "../api/api.js";
// import registerUser from ../auth/

const registerForm = document.getElementById("register-form");
const registerBtn = document.getElementById("register-btn");

registerForm.addEventListener("submit", async (event) =>  {

    event.preventDefault();
    const userData = {
        name: registerForm.name.value.trim(),
        email: registerForm.email.value.trim(),
        password: registerForm.password.value.trim()
    }
    console.log(userData);

    if (userData.name.length < 3 ) {
        const nameSpan = document.getElementById('name-span');
        nameSpan.style.display = 'block';
        return;
    }

    if (userData.email.length === 0 || !userData.email.endsWith("@stud.noroff.no")) {
        const emailSpan = document.getElementById('email-span');
        emailSpan.style.display = 'block';
        return;
    }

    if (userData.password.length < 6) {
    const passwordSpan = document.getElementById('password-span');
    passwordSpan.style.display = 'block';
    return;
}
    // TODO: validation inputs (name, email, password)


    try {
        const response = await registerUser(userData);
        if(response.data?.name) {
            alert("Succesfull Registration");
            window.location.href = '../../pages/login.html';
        }   else if (response?.errors) {
            registerError(response.errors[0].message);
            alert(response.errors[0].message);
        } 
        else {
            alert("Error: Unsuccesful Registration");
        }
    } catch {
            // TODO: error handling
        console.log(response);
    }
})