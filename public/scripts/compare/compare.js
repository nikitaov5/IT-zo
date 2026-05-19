"use strict";

function fillCard(game, ids) {
  document.getElementById(ids.img).src = game.background_image;
  document.getElementById(ids.name).textContent = game.name;
  document.getElementById(ids.genre).textContent =
    "Genre: " + game.genres.map((g) => g.name).join(", ");
  document.getElementById(ids.release).textContent =
    "Release Datum: " + game.released;
  document.getElementById(ids.platform).textContent =
    "Platform: " + game.platforms.map((p) => p.platform.name).join(", ");
  document.getElementById(ids.rating).textContent = "Rating: " + game.rating;
}

async function fetchRandomGames() {
  try {
    const res = await fetch("/compare/random");

    if (!res.ok) {
      console.error("Route failed with status:", res.status);
      return;
    }

    const games = await res.json();
    console.log("Games received:", games);

    fillCard(games[0], {
      img: "gameImg",
      name: "gameName",
      genre: "gameGenre",
      release: "gameRelease",
      platform: "gamePlatform",
      rating: "gameRating",
    });

    fillCard(games[1], {
      img: "gameImg2",
      name: "gameName2",
      genre: "gameGenre2",
      release: "gameRelease2",
      platform: "gamePlatform2",
      rating: "gameRating2",
    });
  } catch (err) {
    console.error("fetchRandomGames error:", err);
  }
}

function setupSearch(inputId, dropdownId, cardIds) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);

  input.addEventListener("input", async () => {
    const query = input.value.trim();

    if (!query) {
      dropdown.classList.add("hidden");
      dropdown.innerHTML = "";
      return;
    }

    try {
      const res = await fetch(`/compare/search?q=${encodeURIComponent(query)}`);
      const games = await res.json();

      dropdown.innerHTML = "";

      if (games.length === 0) {
        dropdown.innerHTML = `<li class="px-4 py-2 text-slate-400 text-sm">Geen resultaten</li>`;
        dropdown.classList.remove("hidden");
        return;
      }

      games.forEach((game) => {
        const li = document.createElement("li");
        li.textContent = game.name;
        li.className =
          "px-4 py-2 text-sm text-slate-100 hover:bg-slate-700 cursor-pointer";

        li.addEventListener("click", () => {
          fillCard(game, cardIds);
          input.value = game.name;
          dropdown.classList.add("hidden");
        });

        dropdown.appendChild(li);
      });

      dropdown.classList.remove("hidden");
    } catch (err) {
      console.error("Search error:", err);
    }
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRandomGames();

  setupSearch("searchInput1", "dropdown1", {
    img: "gameImg",
    name: "gameName",
    genre: "gameGenre",
    release: "gameRelease",
    platform: "gamePlatform",
    rating: "gameRating",
  });

  setupSearch("searchInput2", "dropdown2", {
    img: "gameImg2",
    name: "gameName2",
    genre: "gameGenre2",
    release: "gameRelease2",
    platform: "gamePlatform2",
    rating: "gameRating2",
  });
});
