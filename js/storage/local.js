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