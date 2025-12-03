import { renderProfilePage } from "../components/renderProfile.js";
import { profileFetch } from "../api/profileFetch.js";

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

fetchProfile();

