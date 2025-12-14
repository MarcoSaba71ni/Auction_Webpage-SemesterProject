import { fetchAuction , postBid } from "../api/auctionFetch.js";
import { renderAuction } from "../components/renderAuction.js"; 
import { getUser , deleteUser } from "../storage/local.js";


document.addEventListener("DOMContentLoaded", ()=> {
    const user = getUser();

    const elementsToToggle = [
        { id: 'login-link', showIf: !user},

        {id : 'profile-div', showIf: !!user },
        {id: 'logout-btn', showIf: !!user},
        {id: 'login-btn', showIf: !user},
        {id:'logged-in-icon', showIf: !!user},
        {id:'logged-out-icon', showIf: !user},
        { id: 'register_login-div', showIf: !user }
    ];

    elementsToToggle.forEach(({id, showIf}) =>  {
        const element = document.getElementById(id);
        if(!element) return;
        element.style.display = showIf? "block" : "none";
    })

    if (user) {
        renderAvatar(user);
    }
});


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

async function auctionRendering () {
    try {
        const response = await fetchAuction(id);
        const bid = response.data;
        console.log(bid);
        renderAuction(bid);
    } catch (error) {
        console.log(error);
    }
};

function renderAvatar(user) {

    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');


    loggedOutIcon.href = `login.html`;
    loggedInIcon.href = `profile.html?name=${user.name}`;


}

const logoutBtnWrap = document.getElementById('logout-btn-wrap');
logoutBtnWrap.addEventListener("click", async ()=> {
    deleteUser();
    window.location.href = '../index.html';
    alert("You are being redirected to the Main Page");
});

auctionRendering();
