import { renderProfilePage , userAuction, userBid} from "../components/renderProfile.js";
import { profileFetch , auctionFetch , bidFetch } from "../api/profileFetch.js";
import { getUser } from "../storage/local.js";

// Get the name in the url search parameter

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("name");
console.log(username);


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


async function fetchProfile () {
    try {
        const response = await profileFetch(username);
        const profile = response.data;
        console.log(profile);
        renderProfilePage(profile);
        if(response?.errors) {
            console.log(response.errors.message);
        }
    } catch (error) {
        console.log(error);
    }
};

async function fetchAuction () {
    try {
        const response = await auctionFetch(username);
        const listings = response.data;
        console.log(listings);
        
        listings.forEach(listing => {

            userAuction(listing);
        });
    } catch (error) {
        console.log(error);
    }
}

async function fetchBid () {
    try {
        const usersBid = document.getElementById('users-bid');
        const response = await bidFetch(username);
        const bids = response.data;
        if (bids.length === 0){
            const emptyBid = document.createElement('h3');
            emptyBid.classList.add('empty-bid');
            emptyBid.textContent = "No placed bids";
            usersBid.appendChild(emptyBid);
            return;
        }
        console.log(bids);
        bids.forEach( bid  => {
            userBid(bid);
        })

    } catch (error) {
        console.log(error);
    }
}

fetchProfile();
fetchAuction();
fetchBid();

