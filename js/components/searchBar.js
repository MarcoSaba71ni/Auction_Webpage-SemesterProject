import { apiGet } from "../api/api.js";

const searchBar = document.querySelector("#searchBar");

export function setupSearch(renderFeed) {
  searchBar.addEventListener("input", async (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (!query) {
      renderFeed([]); 
      return;
    }

    try {
      const response = await apiGet(`/auction/listings/search?q=${query}`);
      const results = response.data;
      renderFeed(results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  });
}

export function setupSearch(allListings, renderFeed) {
  const searchBar = document.querySelector("#searchBar");

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    const filtered = allListings.filter((post) => {
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

    renderFeed(filtered);
  });
}
