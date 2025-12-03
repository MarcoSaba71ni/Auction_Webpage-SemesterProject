export function renderProfilePage (profile) {
    const profileSection = document.getElementById('profile-section');
    profileSection.classList.add('profile-section');

    const bannerDiv = document.createElement('div');
    const bannerImg = document.createElement('img');
    bannerImg.src = profile.banner.url;
    bannerImg.alt = profile.banner.alt; 

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');
    

    const profileImg = document.createElement('img');
    profileImg.src = profile.avatar.url;
    profileImg.classList.add('profile-img');

    const textDiv = document.createElement('div');
    textDiv.classList.add('text-div');
    const nameEmailDiv = document.createElement('div');
    const name = document.createElement('h2');
    name.textContent = profile.name;
    name.classList.add('profile-name');
    const email = document.createElement('h3');
    email.textContent = profile.email;
    const description = document.createElement('h3');
    description.textContent = profile.bio;
    if (!profile.bio) {
    description.textContent = "No Bio";
    } else {
    description.textContent = profile.bio;
    }
    const credits = document.createElement('h4');
    credits.textContent = profile.credits;

    const editDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';


    profileSection.append(bannerDiv, infoDiv);

    bannerDiv.appendChild(bannerImg);

    infoDiv.append(profileImg, textDiv, editDiv);

    nameEmailDiv.append(name, email)

    textDiv.append(nameEmailDiv, description, credits);
    editDiv.appendChild(editBtn);
}

/*  <div class="banner-div">
    <!-- dynamically rendered elements -->               
    </div>
    <div class="info-div">
        <div class="avatar-div">
        <!-- dynamically rendered elements -->  
        </div>
        <div class="profile-info">
        <!-- profile rendered elements -->  
        </div>
        <div class="edit-div"> 

        </div>
    </div> */