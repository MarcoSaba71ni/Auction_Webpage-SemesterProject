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
        {id:'logged-out-icon', showIf: !user},
        {id:'mobile-logout', showIf: !!user}
    ];

    elementsToToggle.forEach(({id, showIf}) =>  {
        const element = document.getElementById(id);
        if (!element) return;
        element.style.display = showIf? "flex" : "none";
    });

    if (user) {
        renderAvatar(user);
    }
});

let currentPage = 1;
const limit = 8;
let allListingsCache = [];
let paginatedListingsCache = [];
let currentSearchTerm = "";
const listingsUrl = "/auction/listings";
const searchBar = document.getElementById("search-bar");
const listFeedContainer = document.getElementById("list-feed");
const loadMoreBtn = document.getElementById('load-more-btn');

function normalizeText(value = "") {
    return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function renderListings(listings) {
    if (!listFeedContainer) return;
    listFeedContainer.innerHTML = "";
    listings.forEach((auction) => renderFeed(auction));
}

function renderFilteredFeed() {
    const filteredListings = allListingsCache.filter((auction) => {
        const normalizedTitle = normalizeText(auction?.title || "");
        return normalizedTitle.includes(currentSearchTerm);
    });
    if (filteredListings.length === 0) {
        listFeedContainer.innerHTML = "<p class='text-center w-full mx-12 my-12 text-2xl text-gray-500'> Sorry! No auctions were found matching your search.</p>";
        return;
    }

    renderListings(filteredListings);
}

function updateLoadMoreVisibility() {
    if (!loadMoreBtn) return;
    loadMoreBtn.style.display = currentSearchTerm ? "none" : "flex";
}


async function paginatedListFeed(page) {
    try {
        const paginatedAuctionUrl = `${listingsUrl}?_active=true&_sort=created&sortOrder=desc&limit=${limit}&page=${page}`;
        const response = await apiGet(paginatedAuctionUrl);
        console.log("RAW API RESPONSE:", response);
        const pageListings = response.data || [];
        paginatedListingsCache = paginatedListingsCache.concat(pageListings);

        if (!currentSearchTerm) {
            renderListings(paginatedListingsCache);
        }

        if (loadMoreBtn && pageListings.length < limit) {
            loadMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.log(error);
    }
};

// fetching all listings to have them available for the search functionality without needing to make a new API call every time the user types something in the search bar. This way we can filter through the cached listings and render only the relevant ones based on the search term.
async function fetchAllListings() {
    try {
        const response = await apiGet(listingsUrl);
        const allListings = response.data;
        console.log("ALL LISTINGS:", allListings);
        allListingsCache = allListings || [];
    } catch (error) {
        console.log(error);
    }
};

Promise.all([fetchAllListings(), paginatedListFeed(currentPage)]);

if (searchBar) {
    searchBar.addEventListener("input", (event) => {
        currentSearchTerm = normalizeText(event.target.value);
        updateLoadMoreVisibility();

        // if search bar is not used, we display the paginated feed, if it is used, we display the filtered list.
        if (!currentSearchTerm) {
            renderListings(paginatedListingsCache);
            return;
        }

        renderFilteredFeed();
    });
}


// Search functionality




// BUTTONS FUNCTIONALITIES
// logout btn
const logOutBtn = document.getElementById('logout-btn');

if (logOutBtn) {
    logOutBtn.addEventListener("click", async ()=> {

        deleteUser();
        window.location.href = '../index.html';
        alert("You are being redirected to the Main Page");
    });
}

const logoutBtnWrap = document.getElementById('logout-btn-wrap');
if (logoutBtnWrap) {
    logoutBtnWrap.addEventListener("click", async ()=> {
        deleteUser();
        window.location.href = '../index.html';
        alert("You are being redirected to the Main Page");
    });
}

const loginLink = document.getElementById('login-link');

// loggin btn
if (loginLink) {
    loginLink.addEventListener("click", async ()=> {
        window.location.href = 'login.html';
        alert("You are being redirected to the Sign In page")
    });
}



// loadmore btn
if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", ()=> {
        currentPage++;
        paginatedListFeed(currentPage);
    });
}

function renderAvatar(user) {

    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');


    loggedOutIcon.href = `login.html`;
    loggedInIcon.href = `profile.html?name=${user.name}`;

}
