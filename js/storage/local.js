// responsible for saven, getting and deleting token.
//  Additionally, get user from localStorage

export async function saveToken (token, user) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export async function getToken() {
    const token = localStorage.getItem('accessToken');
    return token;
}

export async function deleteUser () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem("user");
}

export function getUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}