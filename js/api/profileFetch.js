import { apiGet , apiUpdate } from "./api.js";

export async function profileFetch(name) {
    return await apiGet(`/auction/profiles/${name}`)
}

export async function auctionFetch (name) {
    return await apiGet(`/auction/profiles/${name}/listings`)
}

export async function bidFetch (name) {
    return await apiGet(`/auction/profiles/${name}/bids`);
}

export async function updateProfile(name, data) {
    return await apiUpdate(`/social/profiles/${name}`, data);
}