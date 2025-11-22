
import { registerUser } from "../api/auth.js";
import { registerValidation } from "../utils/formValidation.js";
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

    const isValid = registerValidation(userData.name, userData.email, userData.password);

    if(!isValid) {
        return;
    }
    // TODO: validation inputs (name, email, password)


    try {
        const response = await registerUser(userData);
        if(response.data?.name) {
            alert("Succesfull Registration");
            window.location.href = '../../pages/login.html';
        }   else if (response.error) {
            alert(response.error[0].message);
        } 
        else {
            alert("Error: Unsuccesful Registration");
        }
    } catch {
            // TODO: error handling
        console.log(response);
    }
})