"use strict";

let score = 0;
let currentGameName = "";

let input;
let scoreEl;
let flameIcon;
let dropdown;

function updateScore(newScore) {
  score = newScore;
  scoreEl.textContent = score;
  flameIcon.classList.toggle("hidden", score === 0);
}

async function fetchRandomGame() {
  const res = await fetch("/gtg/random");
  const game = await res.json();

  currentGameName = game.name.toLowerCase();

  const screenshots = game.screenshots ?? [];
  const imageSrc =
    screenshots.length > 0
      ? screenshots[Math.floor(Math.random() * screenshots.length)].image
      : game.background_image;

  const img = document.createElement("img");
  img.src = imageSrc;
  img.style.cssText =
    "width:100%; height:100%; object-fit:cover; border-radius:10px;";

  const gameSection = document.getElementById("game");
  gameSection.innerHTML = "";
  gameSection.appendChild(img);
}

function checkGuess(selectedName) {
  if (selectedName.toLowerCase() === currentGameName) {
    updateScore(score + 1);
    fetchRandomGame();
  } else {
    updateScore(0);
  }

  input.value = "";
  dropdown.innerHTML = "";
  dropdown.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  input = document.getElementById("guess-input");
  scoreEl = document.getElementById("score");
  flameIcon = document.getElementById("flame");
  dropdown = document.getElementById("guess-dropdown");

  fetchRandomGame();

  input.addEventListener("input", async () => {
    const query = input.value.trim();

    if (!query) {
      dropdown.classList.add("hidden");
      dropdown.innerHTML = "";
      return;
    }

    const res = await fetch(`/gtg/search?q=${encodeURIComponent(query)}`);
    const games = await res.json();

    dropdown.innerHTML = "";

    if (games.length === 0) {
      dropdown.innerHTML = `<li class="px-5 py-2 text-gray-400 text-sm">Geen resultaten</li>`;
      dropdown.classList.remove("hidden");
      return;
    }

    games.forEach((game) => {
      const li = document.createElement("li");
      li.textContent = game.name;
      li.className =
        "px-5 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer";

      li.addEventListener("click", () => {
        checkGuess(game.name);
      });

      dropdown.appendChild(li);
    });

    dropdown.classList.remove("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});
