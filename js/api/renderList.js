export function renderFeed(auction) {
    const listFeed = document.getElementById('list-feed');
    const cardLink = document.createElement('a');
    cardLink.classList.add('card-link');
    cardLink.href = '../index.html';

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-div');

    const auctionImg = document.createElement('img');
    auctionImg.classList.add('auction-img');
    auctionImg.src = auction.media?.[0]?.url;
    auctionImg.alt = auction.media?.[0]?.alt;

    const title = document.createElement('h2');
    title.textContent = auction.title;
    auctionImg.classList.add('auction-title');

    listFeed.appendChild(cardLink);
    cardLink.appendChild(cardDiv);

    cardDiv.append(auctionImg, title);

}