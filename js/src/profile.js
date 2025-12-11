import { renderProfilePage , userAuction, userBid} from "../components/renderProfile.js";
import { profileFetch , auctionFetch , bidFetch } from "../api/profileFetch.js";
import { getUser } from "../storage/local.js";
import { updateProfile } from "../api/profileFetch.js";
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
        { id: 'register_login-div', showIf: !user },
        {id:'logged-in-icon', showIf: !!user},
        {id:'logged-out-icon', showIf: !user}
    ];
    
    elementsToToggle.forEach(({id, showIf}) => {
        const element = document.getElementById(id);
        if (!element) return;
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


const editForm = document.getElementById('profile-update'); 

editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    editProfile();
})

function clean(value) {
    return value.trim(); 
}


async function editProfile() {
    const updatedValues = {
        bio: clean(editForm.bio.value),
        avatar: {
            url: clean(editForm.avatarUrl.value),
            alt: clean(editForm.avatarAlt.value),
        },
        banner: {
            url: clean(editForm.bannerUrl.value),
            alt: clean(editForm.bannerAlt.value),
        }
    };

    try {
        const response = await updateProfile( username ,updatedValues);

        if (response.errors) {
            alert("Error updating the profile");
            return;
        }

        alert("Profile Updated!");
        console.log(response.data);

    } catch (error) {
        console.log(error);
    }
}

function renderAvatar(user) {

    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');


    loggedOutIcon.href = `login.html`;
    loggedInIcon.href = `profile.html?name=${user.name}`;


}



fetchProfile();
fetchAuction();
fetchBid();

