import { renderFeed } from "../components/renderList.js";
import { apiGet } from "../api/api.js";
import { getUser , deleteUser } from "../storage/local.js";
import { searchSetUp } from "../components/searchBar.js";



document.addEventListener("DOMContentLoaded", ()=> {
    const user = getUser();

    const elementsToToggle = [
        { id: 'sign-in_text', showIf: !user},
        { id: 'login-link', showIf: !user},
        { id: 'create-link', showIf: !!user},
        { id : 'profile-div', showIf: !!user },
        { id: 'logout-btn', showIf: !!user},
        { id: 'login-btn', showIf: !user},
    ];

    elementsToToggle.forEach(({id, showIf}) =>  {
        const element = document.getElementById(id);
        element.style.display = showIf? "block" : "none";
    })

    if (user) {
        renderAvatar(user);
    }
});



async function listFeed() {
    const user = getUser();
    const auctionUrl = '/auction/listings?_active=true&_sort=created&sortOrder=desc';
    const response = await apiGet(`${auctionUrl}`);
    const allListings = response.data;

    allListings.forEach(auction => {
        renderFeed(auction);
    });

    searchSetUp(allListings, renderFeed)
}

listFeed();

// BUTTONS FUNCTIONALITIES
// logout btn
const logOutBtn = document.getElementById('logout-btn');

logOutBtn.addEventListener("click", async ()=> {

    deleteUser();
    window.location.href = '../index.html';
    alert("You are being redirected to the Main Page");
});

const loginLink = document.getElementById('login-link');

loginLink.addEventListener("click", async ()=> {
    window.location.href = 'login.html';
    alert("You are being redirected to the Sign In page")
})

function renderAvatar() {
    const user = getUser();
    if(!user) return;
    const profilePath = document.getElementById('profile-path');
    const profileBannerImg = document.getElementById('profile-banner-img');

    profilePath.href = `../pages/profile.html?name=${user.name}`;

    profileBannerImg.src = user.avatar?.url || '';
}