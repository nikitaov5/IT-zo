import { Games } from "./interfaces/interfaces";

let currentPage = 1;
let selectedGameId: number | null = null;
let currentGameData: Games | null = null;
let currentGames: Games[] = [];

async function loadGames() {
  try {
    const response = await fetch(`/home?page=${currentPage}`, {
      headers: { Accept: "application/json" },
  });
    const games: Games[] = await response.json();
    currentGames = games;
    renderGames(currentGames);
  } catch (error) {
    console.error(error);
  }
}

function renderGames(games: Games[]) {
  const grid = document.getElementById("gamesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  games.forEach((game) => {
    if (!game.background_image) return;

    const gameDiv = document.createElement("div");
    gameDiv.className =
      "cursor-pointer border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500";

    gameDiv.innerHTML = `
      <div class="w-full aspect-[16/9] overflow-hidden">
        <img
          src="${game.background_image}"
          class="w-full h-full object-cover"
          alt="${game.name}"
        />
      </div>

      <div class="p-3">
        <h3 class="font-semibold text-sm line-clamp-2 text-slate-50 text-center">
          ${game.name}
        </h3>
      </div>
    `;

    gameDiv.addEventListener("click", () => {
      selectedGameId = game.id;
      currentGameData = game;
      document.getElementById("gameName")!.textContent = game.name;
      (document.getElementById("gameImage") as HTMLImageElement).src =
        game.background_image;
      document.getElementById("gameRelease")!.textContent =
        `Release Datum: ${game.released}`;
      document.getElementById("gamePlaytime")!.textContent =
        `Average Playtime: ${game.playtime} uur`;
      document.getElementById("gameRating")!.textContent =
        `Rating: ${game.rating}/5`;
      document.getElementById("gamePlatform")!.textContent =
        `Platform: ${game.platforms.map((p) => p.platform.name).join(", ")}`;
      document.getElementById("gameGenre")!.textContent = `Genres: ${game.genres
        .map((g) => g.name)
        .join(", ")}`;
    });

    grid.appendChild(gameDiv);
  });
}

const searchInput = document.getElementById(
  "searchInput",
) as HTMLInputElement | null;

const gamesGrid = document.getElementById("gamesGrid");

searchInput?.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (query === "") { //leeg -> laad normale games op pagina
    loadGames();
    return;
  }

  try {
    const response = await fetch(`/home/search?q=${encodeURIComponent(query)}`);
    const games = await response.json();

    renderGames(games);
    }
   catch (error) {
    console.error("Search error:", error);
  }
});

const alertBox = document.getElementById("alertBox");

function showAlert(message: string, success = true) {
  if (!alertBox) return;

  alertBox.className = success
    ? "fixed top-24 right-4 z-50 p-4 rounded text-sm bg-green-900 text-green-300 border border-green-700"
    : "fixed top-24 right-4 z-50 p-4 rounded text-sm bg-red-900 text-red-300 border border-red-700";

  alertBox.textContent = message;

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
}

document.querySelector("[data-action='add-collection']")?.addEventListener("click", async () => {
  if (!selectedGameId) {
    alert("Kies eerst een game");
    return;
  }

  try {
    const response = await fetch("/collection/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId: selectedGameId }),
    });

    const data = await response.json();

  
    if (data.success) {
      showAlert("Game toegevoegd aan collectie!");
    }
  } catch (error) {
    console.error("Fout bij toevoegen:", error);
  }
});

document.querySelector("[data-action='set-current']")?.addEventListener("click", async () => {
  if (!currentGameData) {
    alert("Kies eerst een game");
    return;
  }

  await fetch("/home/current-game", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId: currentGameData.id }),
  });

  showCurrentGame(currentGameData);
});

function showCurrentGame(game: Games) {
  const container = document.getElementById("currentGame");
  const img = document.getElementById("currentGameImage") as HTMLImageElement;
  const name = document.getElementById("currentGameName");

  img.src = game.background_image;
  name!.textContent = game.name;
  container?.classList.remove("hidden");
  container?.classList.add("flex"); 
  }

async function loadCurrentGame() {
  try {
    const response = await fetch("/home/current-game");
    const game = await response.json();
    if (game) showCurrentGame(game);
    
  } catch (error) {
    console.error("Fout bij laden huidige game:", error);
  }
}
document.getElementById("nextPage")?.addEventListener("click", () => {
  currentPage++;
  loadGames();
  document.getElementById("pageNumber")!.textContent = currentPage.toString();
});

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadGames();
    document.getElementById("pageNumber")!.textContent = currentPage.toString();
  }
});

document
  .getElementById("sortGames")
  ?.addEventListener("change", (e) => {
    const sort = (e.target as HTMLSelectElement).value;

    const sortedGames = [...currentGames];

    switch (sort) {
      case "ratingDesc":
        sortedGames.sort((a, b) => b.rating - a.rating);
        break;

      case "ratingAsc":
        sortedGames.sort((a, b) => a.rating - b.rating);
        break;

      case "name":
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "released":
        sortedGames.sort(
          (a, b) =>
            new Date(b.released).getTime() -
            new Date(a.released).getTime()
        );
        break;
    }

    renderGames(sortedGames);
  });


loadGames();
loadCurrentGame();


