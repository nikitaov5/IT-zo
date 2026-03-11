"use strict";

const API_KEY = "f261bf4dc1a84efeab97fb873bdedb9d";

// Game functionaliteit
let score = 0;
let currentGameName = "";

async function fetchScreenshots() {
  const randomGamePK = Math.floor(Math.random() * 5) + 1;

  // fetch voor game
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page=${randomGamePK}&page_size=20`,
  );

  const gamesData = await response.json();

  if (!gamesData.results || gamesData.results.length === 0) {
    fetchScreenshots();
    return;
  }

  const randomGame =
    gamesData.results[Math.floor(Math.random() * gamesData.results.length)];

  currentGameName = randomGame.name.toLowerCase();

  // fetch voor screenshots
  const ssResponse = await fetch(
    `https://api.rawg.io/api/games/${randomGame.id}/screenshots?key=${API_KEY}`,
  );
  const ssData = await ssResponse.json();

  if (!ssData.results || ssData.results.length === 0) {
    fetchScreenshots();
    return;
  }

  const randomSs =
    ssData.results[Math.floor(Math.random() * ssData.results.length)];

  const img = document.createElement("img");
  img.src = randomSs.image;
  img.style.cssText =
    "width:100%; height:100%; object-fit:cover; border-radius: 10px;";

  const gameSection = document.getElementById("game");
  gameSection.innerHTML = "";
  gameSection.insertAdjacentElement("beforeend", img);
}

const input = document.getElementById("guess-input");
const scoreEl = document.getElementById("score");
const flameIcon = document.getElementById("flame");

function updateScore(newScore) {
  score = newScore;
  scoreEl.textContent = score;
  flameIcon.classList.toggle("hidden", score === 0);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchScreenshots();

  input.addEventListener("keyup", function (e) {
    if (e.key !== "Enter") return;

    const guess = input.value.trim().toLowerCase();

    if (guess === "juistegame") {
      updateScore(score + 1);
      input.value = "";
      fetchScreenshots();
    } else {
      updateScore(0);
      scoreEl.textContent = score;
      input.value = "";
    }
  });
});
