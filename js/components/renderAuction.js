import { apiPost } from "../api/api.js";
import { postBid } from "../api/auctionFetch.js";

export function renderAuction (bid) {
    const auctionWrapper = document.getElementById('auction-wrapper');
    auctionWrapper.classList.add('auction-wrapper');
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

    profileWrapper.href = `profile.html?name=${bid.seller.name}`;
    profileAuction.classList.add('profile-wrapper');
    
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


    const bidBtn = document.createElement('button');
    bidBtn.classList.add('bid-btn');
    bidBtn.textContent = "Place your bid";

    bidBtn.addEventListener("click", () => {
        bidInput.style.display = 'block';
        submitBtn.style.display = 'block';
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


    submitBtn.addEventListener("click", async (e)=> {
        e.preventDefault();

        const amount = Number(bidInput.value.trim());
        if (!amount || amount < 1) return alert("Invalid bid");

        try {
            const response = await postBid(bid.id, amount);
            const data = response.data;
            console.log("Bid placed:", data);
            location.reload();
        } catch (error) {
            console.log(error);
            alert("Bid could not be placed. Make sure you are logged in.");
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

    bidCard.forEach( singleBid => {
        const bidContainer = document.createElement('div');
        bidContainer.classList.add('bid-container', 'bg-white');

        const bidder = document.createElement('h3');
        bidder.textContent = singleBid.bidder.name;

        const amount = document.createElement('h3');
        amount.textContent = `Amount: ${singleBid.amount}`;
        

        const createdBid = document.createElement('p');
        createdBid.textContent = `Date: ${new Date(singleBid.created).toLocaleDateString()}`;
    
        bidContainer.append(bidder, amount, createdBid);
        placedBid.appendChild(bidContainer);
    });
    



    auctionWrapper.append(auctionHeading, profileWrapper, auctionContent);

    auctionContent.append( auctionImgDiv, auctionInfo);
    auctionImgDiv.append( imgOne, rowImg);

    rowImg.append(imgTwo, imgThree, imgFour);

    countDiv.appendChild(bidCount);

    const bidActionRow = document.createElement('div');
    bidActionRow.classList.add('bid-action-row');
    bidActionRow.append(bidBtn, bidInput, submitBtn);

    bidWrapper.append(bidInfo, bidEnd, countDiv, bidActionRow);

    auctionInfo.append(bidWrapper, placedBid);
    
    profileWrapper.appendChild(profileAuction);

    profileAuction.append(profileImgDiv, profileInfoDiv);

    profileImgDiv.appendChild(profileImgAuction);

    profileInfoDiv.append(profileName, profileEmail);


}

