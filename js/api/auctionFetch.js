import { apiGet , apiPost } from "./api.js";

export async function fetchAuction (id) {
    return await apiGet(`/auction/listings/${id}?_seller=true&_bids=true`);
}

export async function postBid(id, amount) {
    return await apiPost(`/auction/listings/${id}/bids`, {
        amount: Number(amount)
    });
}