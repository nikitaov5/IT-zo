"use strict";

let game1 = null;
let game2 = null;

function fillCard(game, id, slot) {
  document.getElementById(id.img).src = game.background_image;
  document.getElementById(id.name).textContent = game.name;
  document.getElementById(id.genre).textContent =
    "Genre: " + game.genres.map((g) => g.name).join(", ");
  document.getElementById(id.release).textContent =
    "Release Datum: " + game.released;
  document.getElementById(id.platform).textContent =
    "Platform: " + game.platforms.map((p) => p.platform.name).join(", ");
  document.getElementById(id.rating).textContent = "Rating: " + game.rating;

  if (slot === 1) game1 = game;
  if (slot === 2) game2 = game;

  if (game1 && game2) updateComparison();
}

function updateComparison() {
  const section = document.getElementById("stats-comparison");
  const body = document.getElementById("stats-body");

  document.getElementById("stat-name1").textContent = game1.name;
  document.getElementById("stat-name2").textContent = game2.name;

  const stats = [
    {
      label: "Rating",
      val1: game1.rating,
      val2: game2.rating,
    },
    {
      label: "Metacritic",
      val1: game1.metacritic ?? 0,
      val2: game2.metacritic ?? 0,
    },
    {
      label: "Aantal genres",
      val1: game1.genres.length,
      val2: game2.genres.length,
    },
    {
      label: "Aantal platforms",
      val1: game1.platforms.length,
      val2: game2.platforms.length,
    },
  ];

  body.innerHTML = "";

  stats.forEach(({ label, val1, val2 }) => {
    const delta = (val1 - val2).toFixed(2);
    const deltaNum = parseFloat(delta);

    const color1 =
      val1 > val2
        ? "text-green-400"
        : val1 < val2
          ? "text-red-400"
          : "text-white";
    const color2 =
      val2 > val1
        ? "text-green-400"
        : val2 < val1
          ? "text-red-400"
          : "text-white";
    const deltaColor =
      deltaNum > 0
        ? "text-green-400"
        : deltaNum < 0
          ? "text-red-400"
          : "text-white";
    const deltaSign = deltaNum > 0 ? "+" : "";

    const row = document.createElement("tr");
    row.className = "border-t border-slate-700";
    row.innerHTML = `
      <td class="py-3 text-left font-semibold ${color1}">${val1}</td>
      <td class="py-3 text-center">
        <span class="text-slate-400">${label}</span>
        <br>
        <span class="text-xs ${deltaColor}">${deltaSign}${delta}</span>
      </td>
      <td class="py-3 text-right font-semibold ${color2}">${val2}</td>
    `;
    body.appendChild(row);
  });

  section.classList.remove("hidden");
}

async function fetchRandomGames() {
  const res = await fetch("/compare/random");
  const games = await res.json();

  fillCard(
    games[0],
    {
      img: "gameImg",
      name: "gameName",
      genre: "gameGenre",
      release: "gameRelease",
      platform: "gamePlatform",
      rating: "gameRating",
    },
    1,
  );

  fillCard(
    games[1],
    {
      img: "gameImg2",
      name: "gameName2",
      genre: "gameGenre2",
      release: "gameRelease2",
      platform: "gamePlatform2",
      rating: "gameRating2",
    },
    2,
  );
}

function setupSearch(inputId, dropdownId, cardIds, slot) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);

  input.addEventListener("input", async () => {
    const query = input.value.trim();

    if (!query) {
      dropdown.classList.add("hidden");
      dropdown.innerHTML = "";
      return;
    }

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
        fillCard(game, cardIds, slot);
        input.value = game.name;
        dropdown.classList.add("hidden");
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
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRandomGames();

  setupSearch(
    "searchInput1",
    "dropdown1",
    {
      img: "gameImg",
      name: "gameName",
      genre: "gameGenre",
      release: "gameRelease",
      platform: "gamePlatform",
      rating: "gameRating",
    },
    1,
  );

  setupSearch(
    "searchInput2",
    "dropdown2",
    {
      img: "gameImg2",
      name: "gameName2",
      genre: "gameGenre2",
      release: "gameRelease2",
      platform: "gamePlatform2",
      rating: "gameRating2",
    },
    2,
  );
});
