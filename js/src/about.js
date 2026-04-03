import { getUser, deleteUser } from "../storage/local.js";

const user = getUser();
document.addEventListener("DOMContentLoaded", () => {

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

const createBtn = document.getElementById("createBtn-about");
createBtn.addEventListener("click", () => {
    if (user) {
        createBtn.addEventListener("click", () => {
            window.location.href = "create.html";
        });
    }
    if (!user) {
        const loginCta = document.getElementById("login-cta");
        loginCta.classList.remove("hidden");
        loginCta.innerHTML = `Please <a href="login.html" class="text-[#432323] font-semibold hover:underline">log in</a> to create a listing.`;
    }
});


