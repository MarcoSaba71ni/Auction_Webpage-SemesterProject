import { getUser , deleteUser } from "../storage/local.js";

document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();

    const elementsToToggle = [
        { id : 'profile-div', showIf: !!user },
        { id: 'logout-btn', showIf: !!user },
        { id: 'login-btn', showIf: !user },
        { id: 'register_login-div', showIf: !user },
        {id:'logged-in-icon', showIf: !!user},
        {id:'logged-out-icon', showIf: !user}
    ];
    
    elementsToToggle.forEach(({id, showIf}) => {
        const element = document.getElementById(id);
        element.style.display = showIf ? "flex" : "none";
    });

    // ONLY call renderAvatar if user exists
    if (user) {
        renderAvatar(user);
    }
});

// logout functionality 
const logOutBtn = document.getElementById('logout-btn');

logOutBtn.addEventListener("click", async () => {
    alert("You are logged out and redirected to the Main Page");
    deleteUser();
    window.location.href = 'index.html';
})

// profile path + avatar
function renderAvatar(user) {

    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');


   loggedOutIcon.href = `/pages/login.html`;
   loggedInIcon.href = `/pages/profile.html?name=${user.name}`;


}



