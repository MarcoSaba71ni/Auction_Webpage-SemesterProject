export async function registerValidation(name, email, password) {
    const nameSpan = document.getElementById('name-span');
    const emailSpan = document.getElementById('email-span');
    const passwordSpan = document.getElementById('password-span');

    if (!name || name < 3) {
        return nameSpan.display.block;
    }
}