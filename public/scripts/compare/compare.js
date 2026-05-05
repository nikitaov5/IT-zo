"use strict";

const API_KEY = "f261bf4dc1a84efeab97fb873bdedb9d";

function fillCard(game, id) {
  document.getElementById(id.img).src = game.background_image;
  document.getElementById(id.name).textContent = game.name;
  document.getElementById(id.genre).textContent =
    "Genre: " + game.genres.map((g) => g.name).join(", ");
  document.getElementById(id.release).textContent =
    "Release Datum: " + game.released;
  document.getElementById(id.platform).textContent =
    "Platform: " + game.parent_platforms.map((p) => p.platform.name).join(", ");
  document.getElementById(id.rating).textContent = "Rating: " + game.rating;
}

async function fetchGame() {
  const randomGamePK = Math.floor(Math.random() * 20) + 1;

  // fetch voor game
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page=${randomGamePK}&page_size=5`,
  );

  const gamesData = await response.json();

  if (!gamesData.results || gamesData.results.length === 0) {
    fetchGame();
    return;
  }

  const randomIndex1 = Math.floor(Math.random() * gamesData.results.length);
  let randomIndex2 = Math.floor(Math.random() * gamesData.results.length);
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * gamesData.results.length);
  }

  const randomGame1 = gamesData.results[randomIndex1];
  const randomGame2 = gamesData.results[randomIndex2];

  fillCard(randomGame1, {
    img: "gameImg",
    name: "gameName",
    genre: "gameGenre",
    release: "gameRelease",
    platform: "gamePlatform",
    rating: "gameRating",
  });

  fillCard(randomGame2, {
    img: "gameImg2",
    name: "gameName2",
    genre: "gameGenre2",
    release: "gameRelease2",
    platform: "gamePlatform2",
    rating: "gameRating2",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchGame();
});
