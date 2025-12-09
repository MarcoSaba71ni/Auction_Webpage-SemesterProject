import { fetchAuction , postBid } from "../api/auctionFetch.js";
import { renderAuction } from "../components/renderAuction.js"; 
import { getUser } from "../storage/local.js";


document.addEventListener("DOMContentLoaded", ()=> {
    const user = getUser();

    const elementsToToggle = [
        { id: 'login-link', showIf: !user},

        {id : 'profile-div', showIf: !!user },
        {id: 'logout-btn', showIf: !!user},
        {id: 'login-btn', showIf: !user},
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

function renderAvatar(user) {
    const profilePath = document.getElementById('profile-path');
    const profileBannerImg = document.getElementById('profile-banner-img');

    profilePath.href = `/pages/profile.html?name=${user.name}`;

    profileBannerImg.src = user.avatar?.url || '';
}


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



auctionRendering();
