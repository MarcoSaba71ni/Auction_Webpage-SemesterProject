import { apiGet , apiUpdate } from "./api.js";

export async function profileFetch(name) {
    return await apiGet(`/auction/profiles/${name}`)
}

export async function auctionFetch (name, page, limit = 3 ) {
    return await apiGet(`/auction/profiles/${name}/listings?limit=${limit}&page=${page}`);
}

export async function bidFetch (name) {
    return await apiGet(`/auction/profiles/${name}/bids?_listing=true`);
}

export async function updateProfile(name, data) {
    return await apiUpdate(`/social/profiles/${name}`, data);
}