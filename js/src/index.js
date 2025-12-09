import { getUser , deleteUser } from "../storage/local.js";

document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();

    const elementsToToggle = [
        { id : 'profile-div', showIf: !!user },
        { id: 'logout-btn', showIf: !!user },
        { id: 'login-btn', showIf: !user },
        { id: 'register_login-div', showIf: !user }
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
    const profilePath = document.getElementById('profile-path');
    const profileBannerImg = document.getElementById('profile-banner-img');

    profilePath.href = `/pages/profile.html?name=${user.name}`;

    profileBannerImg.src = user.avatar?.url || '';
}



