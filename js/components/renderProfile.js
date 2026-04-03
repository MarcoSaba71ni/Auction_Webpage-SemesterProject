import { getUser } from "../storage/local.js";

const user = getUser();

export function renderProfilePage (profile) {
    const profileSection = document.getElementById('profile-section');
    profileSection.classList.add('profile-section');
    profileSection.innerHTML = '';

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner-div');

    const bannerImg = document.createElement('img');
    bannerImg.src = profile?.banner?.url || 'https://picsum.photos/1200/420';
    bannerImg.alt = profile?.banner?.alt || `${profile.name} banner`;
    bannerImg.classList.add('banner-img');


    
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');
    

    const profileImg = document.createElement('img');
        profileImg.src = profile?.avatar?.url || 'https://placehold.co/320x320?text=Avatar';
        profileImg.alt = profile?.avatar?.alt || `${profile.name} avatar`;
    profileImg.classList.add('profile-img');


    const textDiv = document.createElement('div');

    textDiv.classList.add('text-div');
    const nameEmailDiv = document.createElement('div');
    const name = document.createElement('h2');
    name.textContent = profile.name;
    name.classList.add('profile-name');

    const email = document.createElement('h3');
    email.classList.add('profile-email');
    email.textContent = profile.email;

    const description = document.createElement('h3');
    description.classList.add('profile-bio');
    if (!profile.bio) {
        description.textContent = "No bio added yet.";
    } else {
        description.textContent = profile.bio;
    }

    const credits = document.createElement('h4');
    credits.classList.add('profile-credits');
    credits.textContent = `Credits: ${profile.credits}`;


    const infoBtnDiv = document.createElement('div');
    infoBtnDiv.classList.add('info-btn-div');



    const editDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit Profile';
    const editForm = document.getElementById('edit-profile');

    if (user.name !== profile.name) {
        editBtn.style.display = 'none';
    }

    editBtn.addEventListener("click", () => {
        const isClosed = editForm.classList.contains("opacity-0");
        if (isClosed) {
            editForm.classList.remove("opacity-0", "max-h-0", "overflow-hidden");
            editForm.classList.add("max-h-[2000px]");
            editBtn.textContent = 'Close Editor';

            setTimeout(() => {
                editForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
            return;
        }

        editForm.classList.add("opacity-0", "max-h-0", "overflow-hidden");
        editForm.classList.remove("max-h-[2000px]");
        editBtn.textContent = 'Edit Profile';
    });




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
    cardDiv.classList.add('card-div', 'profile-listing-card');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card-link');
    cardLink.href = `auction.html?id=${auction.id}`;

    const imgDiv = document.createElement('div');
    const auctionImg = document.createElement('img');
    auctionImg.classList.add('auction-img');
    auctionImg.src = auction.media?.[0]?.url || 'https://picsum.photos/640/360';
    auctionImg.alt = auction.media?.[0]?.alt || `${auction.title} image`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h2');
    title.textContent = auction.title;
    title.classList.add('auction-title');

    const bidNumber = document.createElement('h3');
    bidNumber.textContent = `Deadline: ${new Date(auction.endsAt).toLocaleDateString()}`;
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
    card.classList.add('card-div', 'profile-bid-card');

    const title = document.createElement('h3');
    title.classList.add('auction-title');
    title.textContent = bid.listing?.title || "Auction";

    const amount = document.createElement('p');
    amount.classList.add('bid-number');
    amount.textContent = `Your bid: ${bid.amount} credits`;

    const date = document.createElement('p');
    date.classList.add('bid-deadline');
    date.textContent = new Date(bid.created).toLocaleDateString();

    const btn = document.createElement('button');
    btn.textContent = "View Auction";
    btn.classList.add('btn-bid');

    btn.addEventListener("click", () => {
        if (bid?.listing?.id) {
            const bidParam = bid?.id ? `&bidId=${encodeURIComponent(bid.id)}` : '';
            window.location.href = `auction.html?id=${bid.listing.id}${bidParam}`;
        }
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