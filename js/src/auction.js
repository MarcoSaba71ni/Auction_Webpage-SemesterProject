import { fetchAuction } from "../api/autionFetch.js";
import { renderAuction } from "../components/renderAuction.js"; 

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