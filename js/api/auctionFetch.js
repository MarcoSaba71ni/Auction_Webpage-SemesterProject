import { apiGet } from "./api.js";

export async function fetchAuction (id) {
    return await apiGet(`/auction/listings/${id}`);
}