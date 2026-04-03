
import { registerUser } from "../api/auth.js";

// import registerUser from ../auth/

const registerForm = document.getElementById("register-form");
const registerBtn = document.getElementById("register-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameSpan = document.getElementById('name-span');
const emailSpan = document.getElementById('email-span');
const passwordSpan = document.getElementById('password-span');
const generalSpan = document.getElementById('general-span');

registerForm.addEventListener("submit", async (event) =>  {

    event.preventDefault();
    function cleanErrors () {
        const errorSpans = [nameSpan, emailSpan, passwordSpan, generalSpan];
        errorSpans.forEach(span => {
            span.style.display = 'none';
        });
    }

    cleanErrors();

    const userData = {
        name: registerForm.name.value.trim(),
        email: registerForm.email.value.trim(),
        password: registerForm.password.value.trim()
    }

    console.log(userData);

    if (!userData.name || !userData.email || !userData.password) {
        if (!userData.name) {
            nameSpan.textContent = "Fill in your name";
            nameSpan.style.display = 'block';
            nameInput.focus();
            return;
        }
        if (!userData.email) {
            emailSpan.textContent = "Fill in a valid email address (@stud.noroff.no)";
            emailSpan.style.display = 'block';
            emailInput.focus();
            return;
        }
        if (!userData.password) {
            passwordSpan.textContent = "Fill in your password";
            passwordSpan.style.display = 'block';
            passwordInput.focus();
            return;

        }
        return;
    }
    // TODO: validation inputs (name, email, password)

    if (userData.name.length < 3) {
        nameSpan.textContent = "Name must contain more than 3 characters";
        nameSpan.style.display = 'block';
        nameInput.focus();
        return;
    }

    if (userData.name.includes(" ")) {
        generalSpan.textContent = "Spaces are not allowed in username. Use letters, numbers, and _.";
        generalSpan.style.display = 'block';
        nameInput.focus();
        return;
    }

    const namePattern = /^[A-Za-z0-9_]+$/;
    if (!namePattern.test(userData.name)) {
        generalSpan.textContent = "Username can only use letters, numbers, and _.";
        generalSpan.style.display = 'block';
        nameInput.focus();
        return;
    }

    if (!userData.email.endsWith("@stud.noroff.no")) {
        emailSpan.textContent = "Email must end with @stud.noroff.no";
        emailSpan.style.display = 'block';
        emailInput.focus();
        return;
    }
    if (userData.password.length < 6) {
        passwordSpan.textContent = "Password must contain at least 6 characters";
        passwordSpan.style.display = 'block';
        passwordInput.focus();
        return;
    };

    try {
        registerBtn.disabled = true;
        registerBtn.textContent = "Registering...";
        const result = await registerUser(userData);

        if (result?.data?.name) {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.log("Console error:", error);
        const apiMessage = error?.errors?.[0]?.message || "";

        if (apiMessage.includes("Name can only use")) {
            generalSpan.textContent = "Spaces and special characters are not allowed in username.";
        } else if (apiMessage) {
            generalSpan.textContent = apiMessage;
        } else {
            generalSpan.textContent = "An error occurred during registration. Please try again.";
        }
        generalSpan.style.display = 'block';
    } finally {
        registerBtn.disabled = false;
        registerBtn.textContent = "Register";
    }
})