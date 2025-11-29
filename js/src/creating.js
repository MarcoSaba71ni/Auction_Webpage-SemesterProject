import { apiPost } from '../api/api.js';
import { getUser } from '../storage/local.js';

const createForm = document.getElementById('create-form');


document.addEventListener("DOMContentLoaded", () => {
    const user = getUser();
    const elementsToToggle = [
        {id: "profile-div" , showIf: !!user },
        {id: "login-btn", showIf: !user },
        {id: "logout-btn", showIf: !!user},
    ]

    elementsToToggle.forEach(({id , showIf}) => {
        const element = document.getElementById(id);
        element.style.display = showIf? "block" : "none";
    }
)});

async function createAuction () {

    const createdAuction = {
        title: createForm.title.value.trim(),
        description: createForm.description.value.trim(),
        media: [ 
            {
                url: createForm["media-url"].value.trim(),
                alt: createForm["media-alt"].value.trim()
            }
        ]
    };

    const response = await apiPost('/auction/listings', createdAuction);

};

createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createAuction();
})

