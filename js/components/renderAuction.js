import { apiPost } from "../api/api.js";
import { postBid } from "../api/auctionFetch.js";
import { getUser , deleteUser } from "../storage/local.js";

export function renderAuction (bid, selectedBidId = null) {
    const auctionWrapper = document.getElementById('auction-wrapper');
    if (!auctionWrapper) return;
    auctionWrapper.innerHTML = "";

    const auctionHeading = document.createElement('h1');
    auctionHeading.textContent = bid.title;
    auctionHeading.classList.add('auction-heading');

    const auctionContent = document.createElement('div');
    auctionContent.classList.add('auction-content');


    const auctionImgDiv = document.createElement('div');
    auctionImgDiv.classList.add('auction-img-div');

    const auctionInfo = document.createElement('div');
    auctionInfo.classList.add('auction-info');


    const imgOne = document.createElement('img');
    const firstImage = bid.media?.[0];
    imgOne.classList.add('img-one');


    imgOne.src = firstImage?.url || "../images/placeholder.jpg";
    imgOne.alt = firstImage?.alt || bid.title;
    
    const rowImg = document.createElement('div');
    rowImg.classList.add('row-img');

    const imgTwo = document.createElement('img');
    const secondImage = bid.media?.[1] || bid.media?.[0];
    imgTwo.classList.add('img-two');

    imgTwo.src = secondImage?.url || "../images/placeholder.jpg";
    imgTwo.alt = secondImage?.alt || bid.title;

    const imgThree = document.createElement('img');
    const thirdImage = bid.media?.[2] || bid.media?.[0];
    imgThree.classList.add('img-three');

    imgThree.src = thirdImage?.url || "../images/placeholder.jpg";
    imgThree.alt = thirdImage?.alt || bid.title;

    const imgFour = document.createElement('img');
    const fourthImage = bid.media?.[2] || bid.media?.[0];
    imgFour.classList.add('img-four');

    imgFour.src = fourthImage?.url || "../images/placeholder.jpg";
    imgFour.alt = fourthImage?.alt || bid.title;

    const profileWrapper = document.createElement('a');
    profileWrapper.classList.add('profile-link');
    const profileAuction = document.createElement('div');
    const authMessage = document.createElement('p');
    authMessage.classList.add('profile-auth-message', 'hidden');
    authMessage.textContent = "Register or Sign into check out our profiles.";
    let authMessageTimer;

    profileWrapper.href = `profile.html?name=${bid.seller.name}`;
    profileAuction.classList.add('profile-wrapper');

    profileWrapper.addEventListener("click", (event) => {
        const token = localStorage.getItem("accessToken");
        if (token) return;

        event.preventDefault();
        clearTimeout(authMessageTimer);
        authMessage.classList.remove('hidden');

        requestAnimationFrame(() => {
            authMessage.classList.add('show');
        });

        authMessageTimer = setTimeout(() => {
            authMessage.classList.remove('show');
            setTimeout(() => {
                authMessage.classList.add('hidden');
            }, 260);
        }, 3000);
    });
    
    const profileImgDiv = document.createElement('div');
    const profileImgAuction = document.createElement('img');
    profileImgAuction.classList.add('profile-img-auction');
    profileImgAuction.src = bid.seller?.avatar?.url;
    profileImgAuction.alt = bid.seller?.avatar?.alt;

    const profileInfoDiv = document.createElement('div');

    const profileName = document.createElement('h3');
    profileName.textContent = bid.seller.name;
    profileName.classList.add('seller-name');

    const profileEmail = document.createElement('h3');
    profileEmail.textContent = bid.seller.email;
    profileEmail.classList.add('seller-email');


    const bidBtnOpen = document.createElement('button');
    bidBtnOpen.classList.add('bid-btn');
    bidBtnOpen.textContent = "Place your bid";
    const bidBtnClose = document.createElement('button');
    bidBtnClose.classList.add('bid-btn', 'hidden');
    bidBtnClose.textContent = "Close your bid";

    bidBtnOpen.addEventListener("click", () => {
        bidInput.style.display = 'block';
        submitBtn.style.display = 'block';
        bidBtnOpen.style.display = 'none';
        bidBtnClose.style.display = 'block';
    });

    bidBtnClose.addEventListener("click", () => {
        bidInput.style.display = 'none';
        submitBtn.style.display = 'none';
        bidBtnOpen.style.display = 'block';
        bidBtnClose.style.display = 'none';
    });

    const bidInput = document.createElement('input');
    bidInput.type = "number";
    bidInput.id = 'bid-input';
    bidInput.classList.add('input-bid');
    bidInput.placeholder = "place your bid here";

    const submitBtn = document.createElement('button');
    submitBtn.id = 'submit-btn';
    submitBtn.textContent = "Submit";
    submitBtn.classList.add('bid-btn', 'hidden');

    const bidStatus = document.createElement('p');
    bidStatus.classList.add('bid-status');


    submitBtn.addEventListener("click", async (e)=> {
        e.preventDefault();

        const amount = Number(bidInput.value.trim());
        if (!amount || amount < 1) {
            bidStatus.textContent = "Invalid bid";
            bidStatus.style.color = "red";
            return;
        }

        if (!getUser()) {
            bidStatus.innerHTML = "You must be logged in to place a bid. <a href='login.html' class='login-link text-blue-500 underline'>Login here</a>";
            bidStatus.style.color = "gray";
            return;
        }

        try {
            const response = await postBid(bid.id, amount);
            const data = response.data;
            console.log("Bid placed:", data);
            bidStatus.textContent = "Bid placed successfully!";
            bidStatus.style.color = "green";
            location.reload();
        } catch (error) {
            console.log(error);
            bidStatus.textContent = "Bid could not be placed. Make sure you are logged in.";
        }
    })

    const bidInfo = document.createElement('div');
    bidInfo.classList.add('bid-info');
    bidInfo.textContent = bid.description || "No description provided.";

    const bidEnd = document.createElement('h3');
    bidEnd.textContent = `Ends at: ${new Date(bid.endsAt).toLocaleString()}`;
    bidEnd.classList.add('bid-end');

    const countDiv = document.createElement('div');
    const bidCount = document.createElement('h3');
    bidCount.classList.add('bid-count');
    bidCount.textContent = `Bids: ${bid._count?.bids ?? 0}`;

    const placedBid = document.createElement('div');
    placedBid.classList.add('placed-bid');

    const bidWrapper = document.createElement('div');
    bidWrapper.classList.add('bid-wrapper');

    const bidCard = bid.bids || [];

    if (!bidCard.length) {
        const emptyBid = document.createElement('h3');
        emptyBid.classList.add('empty-bid');
        emptyBid.textContent = "No bids yet. Be the first one.";
        placedBid.appendChild(emptyBid);
    }

    let selectedBidElement = null;

    bidCard.forEach( singleBid => {
        const bidContainer = document.createElement('div');
        bidContainer.classList.add('bid-container', 'bg-white');

        if (selectedBidId && String(singleBid.id) === String(selectedBidId)) {
            bidContainer.classList.add('highlighted-bid');
            selectedBidElement = bidContainer;
        }

        const bidder = document.createElement('h3');
        bidder.textContent = singleBid.bidder.name;

        const amount = document.createElement('h3');
        amount.textContent = `Amount: ${singleBid.amount}`;
        

        const createdBid = document.createElement('p');
        createdBid.textContent = `Date: ${new Date(singleBid.created).toLocaleDateString()}`;
    
        bidContainer.append(bidder, amount, createdBid);
        placedBid.appendChild(bidContainer);
    });

    if (selectedBidElement) {
        requestAnimationFrame(() => {
            selectedBidElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        });
    }
    



    auctionWrapper.append(auctionHeading, profileWrapper, authMessage, auctionContent);

    auctionContent.append( auctionImgDiv, auctionInfo);
    auctionImgDiv.append( imgOne, rowImg);

    rowImg.append(imgTwo, imgThree, imgFour);

    countDiv.appendChild(bidCount);

    const bidActionRow = document.createElement('div');
    bidActionRow.classList.add('bid-action-row');
    bidActionRow.append(bidBtnOpen, bidBtnClose, bidInput, submitBtn, bidStatus);

    bidWrapper.append(bidInfo, bidEnd, countDiv, bidActionRow);

    auctionInfo.append(bidWrapper, placedBid);
    
    profileWrapper.appendChild(profileAuction);

    profileAuction.append(profileImgDiv, profileInfoDiv);

    profileImgDiv.appendChild(profileImgAuction);

    profileInfoDiv.append(profileName, profileEmail);


}

