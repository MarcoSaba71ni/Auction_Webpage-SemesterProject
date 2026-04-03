import { apiPost } from '../api/api.js';
import { getUser, deleteUser } from '../storage/local.js';

const createForm = document.getElementById('create-form');

document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    const elementsToToggle = [
        { id: 'profile-div', showIf: !!user },
        { id: 'login-btn', showIf: !user },
        { id: 'logout-btn', showIf: !!user },
        { id: 'logged-in-icon', showIf: !!user },
        { id: 'logged-out-icon', showIf: !user },
        { id: 'mobile-logout', showIf: !!user },
    ];

    elementsToToggle.forEach(({ id, showIf }) => {
        const element = document.getElementById(id);
        if (!element) return;
        element.style.display = showIf ? 'block' : 'none';
    });

    if (user) {
        renderAvatar(user);
    }
});

function clearWarnings() {
    const generalWarn = document.getElementById('general_warn');
    const mediaWarn = document.getElementById('media-url_warn');
    const deadlineWarn = document.getElementById('deadline_warn');

    if (generalWarn) {
        generalWarn.textContent = '';
        generalWarn.style.display = 'none';
    }

    if (mediaWarn) {
        mediaWarn.textContent = '';
    }

    if (deadlineWarn) {
        deadlineWarn.style.display = 'none';
    }
}

function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

function isValidForm() {
    const generalWarn = document.getElementById('general_warn');
    const mediaWarn = document.getElementById('media-url_warn');
    const deadlineWarn = document.getElementById('deadline_warn');

    const title = createForm.title.value.trim();
    const description = createForm.description.value.trim();
    const deadline = createForm.deadline.value.trim();
    const mediaUrl = createForm['media-url'].value.trim();
    const mediaAlt = createForm['media-alt'].value.trim();

    if (!title || !description || !deadline) {
        if (generalWarn) {
            generalWarn.textContent = 'Please fill in all required fields.';
            generalWarn.style.display = 'block';
        }
        return false;
    }

    const deadlineDate = new Date(deadline);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    if (Number.isNaN(deadlineDate.getTime()) || deadlineDate <= new Date() || deadlineDate > maxDate) {
        if (deadlineWarn) {
            deadlineWarn.style.display = 'block';
        }
        return false;
    }

    if ((mediaUrl && !mediaAlt) || (!mediaUrl && mediaAlt)) {
        if (mediaWarn) {
            mediaWarn.textContent = 'Media URL and Alt must both be filled.';
        }
        return false;
    }

    if (mediaUrl && !isValidUrl(mediaUrl)) {
        if (mediaWarn) {
            mediaWarn.textContent = 'Please enter a valid media URL.';
        }
        return false;
    }

    return true;
}

async function createAuction() {
    clearWarnings();

    if (!isValidForm()) {
        return;
    }

    const mediaUrl = createForm['media-url'].value.trim();
    const mediaAlt = createForm['media-alt'].value.trim();

    const createdAuction = {
        title: createForm.title.value.trim(),
        description: createForm.description.value.trim(),
        tags: createForm.tag.value.trim() ? [createForm.tag.value.trim()] : [],
        media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
        endsAt: new Date(createForm.deadline.value.trim()).toISOString(),
    };

    try {
        const response = await apiPost('/auction/listings', createdAuction);

        if (response?.data) {
            alert('Succesfull creation! You are being redirected to the main page!');
            window.location.href = 'listing.html';
            return;
        }

        if (response?.errors) {
            handleErrors(response.errors);
        }
    } catch (error) {
        const apiErrors = error?.errors || [];
        if (apiErrors.length) {
            handleErrors(apiErrors);
            return;
        }

        const generalWarn = document.getElementById('general_warn');
        if (generalWarn) {
            generalWarn.textContent = 'Could not create listing. Please try again.';
            generalWarn.style.display = 'block';
        }
    }
}

if (createForm) {
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        createAuction();
    });
}

function handleErrors(errors) {
    errors.forEach((error) => {
        const path = error.path?.join('.') || '';
        const message = error.message;

        if (path.includes('media')) {
            const mediaWarn = document.getElementById('media-url_warn');
            if (mediaWarn) {
                mediaWarn.textContent = message;
            }
            return;
        }

        if (path.includes('endsAt')) {
            const deadlineWarn = document.getElementById('deadline_warn');
            if (deadlineWarn) {
                deadlineWarn.style.display = 'block';
            }
            return;
        }

        const generalWarn = document.getElementById('general_warn');
        if (generalWarn) {
            generalWarn.textContent = message;
            generalWarn.style.display = 'block';
        }
    });
}

function renderAvatar(user) {
    const loggedInIcon = document.getElementById('logged-in-icon');
    const loggedOutIcon = document.getElementById('logged-out-icon');

    if (loggedOutIcon) {
        loggedOutIcon.href = 'login.html';
    }

    if (loggedInIcon) {
        loggedInIcon.href = `profile.html?name=${user.name}`;
    }
}

const logOutBtn = document.getElementById('logout-btn');
if (logOutBtn) {
    logOutBtn.addEventListener('click', async () => {
        deleteUser();
        window.location.href = '../index.html';
        alert('You are being redirected to the Main Page');
    });
}

const logoutBtnWrap = document.getElementById('logout-btn-wrap');
if (logoutBtnWrap) {
    logoutBtnWrap.addEventListener('click', async () => {
        deleteUser();
        window.location.href = '../index.html';
        alert('You are being redirected to the Main Page');
    });
}


