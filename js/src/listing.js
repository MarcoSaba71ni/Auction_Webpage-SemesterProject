import { renderFeed } from "../components/renderList.js";
import { apiGet } from "../api/api.js";
import { getUser , deleteUser } from "../storage/local.js";

document.addEventListener("DOMContentLoaded", ()=> {
    const user = getUser();

    const elementsToToggle = [
        {id: 'sign-in_text', showIf: !user},
        { id: 'login-link', showIf: !user},
        { id: 'create-link', showIf: !!user},
        {id : 'profile-div', showIf: !!user },
        {id: 'logout-btn', showIf: !!user},
        {id: 'login-btn', showIf: !user},
        {id:'logged-in-icon', showIf: !!user},
        {id:'logged-out-icon', showIf: !user}
    ];

    elementsToToggle.forEach(({id, showIf}) =>  {
        const element = document.getElementById(id);
        element.style.display = showIf? "flex" : "none";
    })

    if (user) {
        renderAvatar(user);
    }
});



async function listFeed() {
    const auctionUrl = '/auction/listings?_active=true&_sort=created&sortOrder=desc';
    const response = await apiGet(`${auctionUrl}`);
    console.log("RAW API RESPONSE:", response);
    const allListings = response.data;

    allListings.forEach(auction => {
        console.log("AUCTION:", auction);
        renderFeed(auction);
        console.log(auction)
    });
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

function renderAvatar(user) {

    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');


   loggedOutIcon.href = `login.html`;
   loggedInIcon.href = `profile.html?name=${user.name}`;


}
