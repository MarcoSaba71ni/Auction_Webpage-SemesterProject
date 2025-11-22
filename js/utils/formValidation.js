export async function registerValidation(name, email, password) {
    const nameSpan = document.getElementById('name-span');
    const emailSpan = document.getElementById('email-span');
    const passwordSpan = document.getElementById('password-span');
    
    nameSpan.style.display = "none";
    emailSpan.style.display = "none";
    passwordSpan.style.display = "none";

    let isValid = true;

    if (!name || name.length < 3) {
        nameSpan.display.style = "block";
        isValid = false;
    }

    if (!email || !email.endWith("@stud.noroff.no")) {
        emailSpan.display.style = "block";
        isValid = false;
    }

    if (!password || password.length < 8) {
        password.display.style = "block";
        isValid = false;
    }

    return isValid;
}