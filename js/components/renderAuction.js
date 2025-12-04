
export function renderAuction (bid) {
    const auctionWrapper = document.getElementById('auction-wrapper');
    const auctionImgDiv = document.createElement('div');

    const imgOne = document.createElement('img');
    const firstImage = bid.media?.[0]; // <= SAFEST way
    imgOne.classList.add('img-one');


    imgOne.src = firstImage?.url || "../images/placeholder.jpg";
    imgOne.alt = firstImage?.alt || bid.title;
    
    const rowImg = document.createElement('row-img');
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

    auctionWrapper.appendChild(auctionImgDiv);
    auctionImgDiv.append(imgOne, rowImg);

    rowImg.append(imgTwo, imgThree, imgFour);
}

