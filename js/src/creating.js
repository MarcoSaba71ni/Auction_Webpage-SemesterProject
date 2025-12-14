import { apiPost } from '../api/api.js';
import { getUser , deleteUser } from '../storage/local.js';

const createForm = document.getElementById('create-form');


document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();
    const elementsToToggle = [
        {id: "profile-div" , showIf: !!user },
        {id: "login-btn", showIf: !user },
        {id: "logout-btn", showIf: !!user},
        {id:'logged-in-icon', showIf: !!user},
        {id:'logged-out-icon', showIf: !user}
    ]

    elementsToToggle.forEach(({id , showIf}) => {
        const element = document.getElementById(id);
        element.style.display = showIf? "block" : "none";
    });
    if (user) {
        renderAvatar(user);
    }
});

async function createAuction () {

    const createdAuction = {
        title: createForm.title.value.trim(),
        description: createForm.description.value.trim(),
        tags:  createForm.tag.value.trim() ? [createForm.tag.value.trim()] : [],
        media: [ 
            {
                url: createForm["media-url"].value.trim(),
                alt: createForm["media-alt"].value.trim()
            }
        ],
        endsAt: new Date (createForm.deadline.value.trim()).toISOString()
    };




    try {
        const response = await apiPost(`/auction/listings`, createdAuction);
        console.log(response);
        if(response?.data) {
            alert("Succesfull creation! You are being redirected to the main page!");
            window.location.href = "listing.html";
        }
        else if (response?.errors) {
            console.log(response.errors);
            handleErrors(response.errors);
        }
    } catch (error) {
        console.log(error);
    }


};

createForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    createAuction();
});

function handleErrors(errors) {
    errors.forEach(error => {
        const path = error.path.join(".");
        const message = error.message // "media", "endsAt", etc.

        if (path.includes("media")) {
            const mediaWarn = document.getElementById('media-url_warn');
            mediaWarn.textContent = message; 
        }
    });
}

function renderAvatar(user) {
    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');

   loggedOutIcon.href = `/pages/login.html`;
   loggedInIcon.href = `/pages/profile.html?name=${user.name}`;
}

const logOutBtn = document.getElementById('logout-btn');

logOutBtn.addEventListener("click", async ()=> {

    deleteUser();
    window.location.href = '../index.html';
    alert("You are being redirected to the Main Page");
});

const logoutBtnWrap = document.getElementById('logout-btn-wrap');
logoutBtnWrap.addEventListener("click", async ()=> {
    deleteUser();
    window.location.href = '../index.html';
    alert("You are being redirected to the Main Page");
});


