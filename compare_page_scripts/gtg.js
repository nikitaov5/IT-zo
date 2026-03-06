"use strict";

const API_KEY = "f261bf4dc1a84efeab97fb873bdedb9d";

async function fetchScreenshots() {
  const randomGamePK = Math.floor(Math.random() * 500000) + 1;

  const response = await fetch(
    `https://api.rawg.io/api/games/${randomGamePK}/screenshots?key=${API_KEY}`,
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    fetchScreenshots();
    return;
  }

  const randomScreenshot =
    data.results[Math.floor(Math.random() * data.results.length)];

  const img = document.createElement("img");
  img.src = randomScreenshot.image;
  img.style.cssText = "width:100%; height:100%; object-fit:cover;";

  const gameSection = document.getElementById("game");
  gameSection.insertAdjacentElement("beforeend", img);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchScreenshots();
});
