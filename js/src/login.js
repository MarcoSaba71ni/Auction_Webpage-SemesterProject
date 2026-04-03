import { loginUser } from "../api/auth.js";
import { saveToken } from "../storage/local.js";

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn') || loginForm?.querySelector('button[type="submit"]');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailSpan = document.getElementById('email-span');
const passwordSpan = document.getElementById('password-span');
const generalSpan = document.getElementById('general-span');
const defaultLoginLabel = loginBtn?.textContent?.trim() || 'Login';

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    function cleanErrors () {
        const errorSpans = [emailSpan, passwordSpan, generalSpan];
        errorSpans.forEach(span => {
            if (!span) return;
            span.textContent = '';
            span.style.display = 'none';
        }
        );
    }

    cleanErrors();

    const credentials = {
        email: loginForm.email.value.trim(),
        password: loginForm.password.value.trim()
    }

    if (!credentials.email || !credentials.password) {
        if (!credentials.email) {
            emailSpan.textContent = "Fill in your email";
            emailSpan.style.display = 'block';
            emailInput.focus();
            return;
        }
        if (!credentials.password) {
            passwordSpan.textContent = "Fill in your password";
            passwordSpan.style.display = 'block';
            passwordInput.focus();
            return;
        }
        return;
    }

        if (credentials.email.includes("@stud.noroff.no") === false) {
            emailSpan.textContent = "Email must contain @stud.noroff.no";
            emailSpan.style.display = 'block';
            emailInput.focus();
            return;
        };

        if (credentials.password.length < 8) {
            passwordSpan.textContent = "Password must contain at least 8 characters";
            passwordSpan.style.display = 'block';
            passwordInput.focus();
            return;
        };


    // TODO: FORM VALIDATION
    try {
        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.setAttribute('aria-busy', 'true');
            loginBtn.textContent = 'Logging in...';
        }

        const response = await loginUser(credentials);
        console.log(response);


        if (response.data?.accessToken) {
            saveToken(response.data.accessToken, {
                name: response.data.name,
                email: response.data.email
            });
            alert("Login successful! You will be redirected to the homepage.");
            window.location.href = "../index.html";
        }
        
    } catch (error) {
        const apiMessage = error?.errors?.[0]?.message || '';

        if (generalSpan) {
            generalSpan.textContent = apiMessage || 'Invalid email or password.';
            generalSpan.style.display = 'block';
        }

        console.log(error?.message || apiMessage);
    } finally {
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.removeAttribute('aria-busy');
            loginBtn.textContent = defaultLoginLabel;
        }
    }

    // TODO: ERROR HANDLING

})