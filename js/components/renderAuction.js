
export function renderAuction (bid) {
    const auctionWrapper = document.getElementById('auction-wrapper');

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
    const firstImage = bid.media?.[0]; // <= SAFEST way
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


    const bidBtn = document.createElement('button');
    bidBtn.classList.add('bid-btn');
    bidBtn.textContent = "Place your bid";

    const bidInput = document.createElement('input');
    bidInput.classList.add('input-bid');

    const bidInfo = document.createElement('div');
    bidInfo.classList.add('bid-info');
    bidInfo.textContent = bid.description;

    const bidEnd = document.createElement('h3');
    bidEnd.textContent = bid.endsAt;
    bidEnd.classList.add('bid-end');

    const countDiv = document.createElement('div');
    const bidCount = document.createElement('h3');
    bidCount.textContent = bid?._count.bids[0];




    auctionWrapper.append(auctionHeading, auctionContent);

    auctionContent.append( auctionImgDiv, auctionInfo);
    auctionImgDiv.append( imgOne, rowImg);

    rowImg.append(imgTwo, imgThree, imgFour);

    countDiv.appendChild(bidCount);

    auctionInfo.append(bidBtn, bidInput , bidInfo, bidEnd, countDiv);


}

