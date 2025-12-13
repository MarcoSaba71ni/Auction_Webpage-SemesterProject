

export function renderProfilePage (profile) {
    const profileSection = document.getElementById('profile-section');
    profileSection.classList.add('profile-section');

    const bannerDiv = document.createElement('div');
    const bannerImg = document.createElement('img');
    bannerImg.src = profile.banner.url;
    bannerImg.alt = profile.banner.alt; 
    bannerImg.classList.add('banner-div');


    
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
    credits.textContent = `Credits: ${profile.credits}`;


    const infoBtnDiv = document.createElement('div');
    infoBtnDiv.classList.add('info-btn-div');



    const editDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';    
    const editForm = document.getElementById('edit-profile');

    editBtn.addEventListener("click", () => {
        editForm.classList.toggle("opacity-0");
        editForm.classList.toggle("max-h-0");
        editForm.classList.toggle("max-h-[2000px]"); // Smooth opening
        editForm.classList.toggle("overflow-hidden");
        editBtn.style.display = "none";

            setTimeout(() => {
                editForm.scrollIntoView({
                behavior: "smooth",
                block: "start",
        });
    }, 100); 
    })




    profileSection.append(bannerDiv, infoDiv);

    bannerDiv.appendChild(bannerImg);

    infoDiv.append(profileImg, infoBtnDiv);

    infoBtnDiv.append(textDiv, editDiv);

    nameEmailDiv.append(name, email);

    textDiv.append(nameEmailDiv, description, credits);
    editDiv.appendChild(editBtn);
}

export function userAuction (auction) {

    const interactedAuctions = document.getElementById('interacted-auctions');
    interactedAuctions.classList.add('interacted-auctions');

    const card = renderAuctionCard(auction);
    interactedAuctions.append(card);
    
}


export function renderAuctionCard(auction) {
    const interactedAuctions = document.getElementById('interacted-auctions');
    interactedAuctions.classList.add('interacted-auctions');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-div');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card-link');
    cardLink.href = `auction.html?id=${auction.id}`;

    const imgDiv = document.createElement('div');
    const auctionImg = document.createElement('img');
    auctionImg.classList.add('auction-img');
    auctionImg.src = auction.media?.[0]?.url;
    auctionImg.alt = auction.media?.[0]?.alt;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h2');
    title.textContent = auction.title;
    title.classList.add('auction-title');

    const bidNumber = document.createElement('h3');
    bidNumber.textContent = `Deadline: ${auction.endsAt}`;
    bidNumber.classList.add('bid-number');

    const bidDeadline = document.createElement('h3');
    bidDeadline.textContent = `Bids: ${auction._count.bids}`;
    bidDeadline.classList.add('bid-deadline');

    const btnDiv = document.createElement('div');

    const btnBid = document.createElement('button');
    btnBid.classList.add('btn-bid');
    btnBid.textContent = 'Go To';

    btnBid.addEventListener("click", () => {
        window.location.href = `auction.html?id=${auction.id}`;
    });

    // Append structure
    cardDiv.append(cardLink, cardBody);
    imgDiv.appendChild(auctionImg);
    btnDiv.appendChild(btnBid);
    cardBody.append(title, bidNumber, bidDeadline, btnDiv);
    cardLink.append(imgDiv);

    return cardDiv;
};

export function renderUserBidCard(bid) {
    const usersBid = document.getElementById('users-bid');
    usersBid.classList.add('interacted-auctions');

    const card = document.createElement('div');
    card.classList.add('card-div');

    const title = document.createElement('h3');
    title.textContent = bid.listing?.title || "Auction";

    const amount = document.createElement('p');
    amount.textContent = `Your bid: ${bid.amount} credits`;

    const date = document.createElement('p');
    date.textContent = new Date(bid.created).toLocaleDateString();

    const btn = document.createElement('button');
    btn.textContent = "View Auction";
    btn.classList.add('btn-bid');

    btn.addEventListener("click", () => {
        window.location.href = `auction.html?id=${bid.listing.id}`;
    });

    card.append(title, amount, date, btn);
    usersBid.append(card);
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