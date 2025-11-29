import { getUser ,deleteUser } from "../storage/local.js";


document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();

    const elementsToToggle = [
        {id : 'profile-div', showIf: !!user },
        {id: 'logout-btn', showIf: !!user},
        {id: 'login-btn', showIf: !user},
        {id: 'register_login-div', showIf: !user}
    ];
    elementsToToggle.forEach(({id, showIf})=> {
        const element = document.getElementById(id);
        element.style.display = showIf ? "flex" : "none";
    })
});

const logOutBtn = document.getElementById('logout-btn');

logOutBtn.addEventListener("click", async ()=> {
    alert("You are logged out and redirected to the Main Page");
    deleteUser();
    window.location.href = 'index.html';
})