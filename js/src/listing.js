import { renderFeed } from "../api/renderList.js";
import { apiGet } from "../api/api.js";
import { API_BASE } from "../utils/constants.js";

async function listFeed() {
    const auctionUrl = '/auction/listings';
    const response = await apiGet(`${auctionUrl}`);
    const data = response.data;

    data.forEach(auction => {
        renderFeed(auction);
        console.log(auction)
    });
}

listFeed();