import { apiGet } from "./api.js";

export async function profileFetch(name) {
    return await apiGet(`/auction/profiles/${name}`)
}