import { renderProfilePage , userAuction, userBid} from "../components/renderProfile.js";
import { profileFetch , auctionFetch , bidFetch } from "../api/profileFetch.js";

// Get the name in the url search parameter

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("name");
console.log(username);

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

