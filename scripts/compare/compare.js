"use strict";

const API_KEY = "f261bf4dc1a84efeab97fb873bdedb9d";

async function fetchGame() {
  const randomGamePK = Math.floor(Math.random() * 20) + 1;

  const img1 = document.getElementById("gameImg");
  const gameName1 = document.getElementById("gameName");
  const gameGenre1 = document.getElementById("gameGenre");
  const gameRelease1 = document.getElementById("gameRelease");
  const gamePlatform1 = document.getElementById("gamePlatform");
  const gameRating1 = document.getElementById("gameRating");

  const img2 = document.getElementById("gameImg2");
  const gameName2 = document.getElementById("gameName2");
  const gameGenre2 = document.getElementById("gameGenre2");
  const gameRelease2 = document.getElementById("gameRelease2");
  const gamePlatform2 = document.getElementById("gamePlatform2");
  const gameRating2 = document.getElementById("gameRating2");
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
    randomIndex2 = gamesData.results.Math.floor(
      Math.random() * gamesData.results.length,
    );
  }

  const randomGame1 = gamesData.results[randomIndex1];
  const randomGame2 = gamesData.results[randomIndex2];
  // Game 1
  img1.src = randomGame1.background_image;
  gameName1.textContent = "Titel: " + randomGame1.name;
  gameGenre1.textContent =
    "Genre: " + randomGame1.genres.map((g) => g.name).join(", ");
  gameRelease1.textContent = "Release Datum: " + randomGame1.released;
  gamePlatform1.textContent =
    "Platforms: " +
    randomGame1.parent_platforms.map((p) => p.platform.name).join(", ");
  gameRating1.textContent = "Rating: " + randomGame1.rating;

  // Game 2
  img2.src = randomGame2.background_image;
  gameName2.textContent = "Titel: " + randomGame2.name;
  gameGenre2.textContent =
    "Genre: " + randomGame2.genres.map((g) => g.name).join(", ");
  gameRelease2.textContent = "Release Datum: " + randomGame2.released;
  gamePlatform2.textContent =
    "Platforms: " +
    randomGame2.parent_platforms.map((p) => p.platform.name).join(", ");
  gameRating2.textContent = "Rating: " + randomGame2.rating;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchGame();
});
