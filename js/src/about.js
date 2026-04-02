import { getUser, deleteUser } from "../storage/local.js";

document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();

    const elementsToToggle = [
        { id: "profile-div", showIf: !!user },
        { id: "logout-btn", showIf: !!user },
        { id: "login-btn", showIf: !user },
        { id: "logged-in-icon", showIf: !!user },
        { id: "logged-out-icon", showIf: !user },
        { id: "mobile-logout", showIf: !!user }
    ];

    elementsToToggle.forEach(({ id, showIf }) => {
        const element = document.getElementById(id);
        if (!element) return;
        element.style.display = showIf ? "flex" : "none";
    });

    if (user) {
        renderAvatar(user);
    }
});

function renderAvatar(user) {
    const loggedInIcon = document.getElementById("logged-in-icon");
    const loggedOutIcon = document.getElementById("logged-out-icon");

    if (loggedOutIcon) loggedOutIcon.href = "login.html";
    if (loggedInIcon) loggedInIcon.href = `profile.html?name=${user.name}`;
}

const logOutBtn = document.getElementById("logout-btn");
if (logOutBtn) {
    logOutBtn.addEventListener("click", () => {
        deleteUser();
        window.location.href = "../index.html";
        alert("You are being redirected to the Main Page");
    });
}

const logoutBtnWrap = document.getElementById("logout-btn-wrap");
if (logoutBtnWrap) {
    logoutBtnWrap.addEventListener("click", () => {
        deleteUser();
        window.location.href = "../index.html";
        alert("You are being redirected to the Main Page");
    });
}
