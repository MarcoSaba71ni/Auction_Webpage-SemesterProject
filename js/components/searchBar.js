

export async function searchSetUp (allListings, renderFeed) {
    const searchBar = document.getElementById('search-bar');

    searchBar.addEventListener("input", (e)=> {
        e.preventDefault();
        const query = e.target.value.trim().toLowerCase();
        doSearch(query, allListings, renderFeed);
    })
}

export function doSearch(query, allListings, renderFeed) {
    const filteredPosts = allListings.filter((post) => {
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    const author = post.author?.name?.toLowerCase() || "";
    const email = post.author?.email?.toLowerCase() || "";


    return (
      title.includes(query) ||
      body.includes(query) ||
      author.includes(query) ||
      email.includes(query)
    );
  });

  renderFeed(filteredPosts);

};



