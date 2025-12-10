export function renderFeed(auction) {
    const listFeed = document.getElementById('list-feed');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-div');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card-link');
    cardLink.href = `auction.html?id=${auction.id}`;

    const imgDiv = document.createElement('div');
    const auctionImg = document.createElement('img');
    auctionImg.classList.add('auction-img');
    auctionImg.src = auction?.media?.[0]?.url;
    auctionImg.alt = auction?.media?.[0]?.alt;

    const cardBody = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = auction.title;
    title.classList.add('auction-title');

    const bidNumber = document.createElement('h3');
    bidNumber.textContent = `Deadline: ${auction.endsAt}`;
    bidNumber.classList.add('bid-number');

    const bidDeadline = document.createElement('h3');
    bidDeadline.textContent = `Bids: ${auction._count?.bids}`;
    bidDeadline.classList.add('bid-deadline');

    const btnDiv = document.createElement('div');

    const btnBid = document.createElement('button');
    btnBid.classList.add('btn-bid');
    btnBid.textContent = 'Go To';

    btnBid.addEventListener("click", ()=> {
        window.location.href = `auction.html?id=${auction.id}`;
    });
    


    listFeed.appendChild(cardDiv);
    cardDiv.append(cardLink, cardBody);
    imgDiv.appendChild(auctionImg);
    btnDiv.appendChild(btnBid);
    cardBody.append(title, bidNumber, bidDeadline, btnDiv);


    cardLink.append(imgDiv);

}