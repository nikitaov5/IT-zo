var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
let currentPage = 1;
let selectedGameId = null;
let currentGameData = null;
function loadGames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/home?page=${currentPage}`, {
                headers: { Accept: "application/json" },
            });
            const games = yield response.json();
            renderGames(games);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function renderGames(games) {
    const grid = document.getElementById("gamesGrid");
    if (!grid)
        return;
    grid.innerHTML = "";
    games.forEach((game) => {
        if (!game.background_image)
            return;
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
            document.getElementById("gameName").textContent = game.name;
            document.getElementById("gameImage").src =
                game.background_image;
            document.getElementById("gameRelease").textContent =
                `Released: ${game.released}`;
            document.getElementById("gamePlaytime").textContent =
                `Average Playtime: ${game.playtime} uur`;
            document.getElementById("gameRating").textContent =
                `Rating: ${game.rating}/5`;
            document.getElementById("gamePlatform").textContent =
                `Platforms: ${game.platforms.map((p) => p.platform.name).join(", ")}`;
            document.getElementById("gameGenre").textContent = `Genres: ${game.genres
                .map((g) => g.name)
                .join(", ")}`;
        });
        grid.appendChild(gameDiv);
    });
}
const searchInput = document.getElementById("searchInput");
const gamesGrid = document.getElementById("gamesGrid");
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", () => __awaiter(void 0, void 0, void 0, function* () {
    const query = searchInput.value.trim();
    if (query === "") { //leeg -> laad normale games op pagina
        loadGames();
        return;
    }
    try {
        const response = yield fetch(`/home/search?q=${encodeURIComponent(query)}`);
        const games = yield response.json();
        renderGames(games);
    }
    catch (error) {
        console.error("Search error:", error);
    }
}));
(_a = document.querySelector("[data-action='add-collection']")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (!selectedGameId) {
        alert("Kies eerst een game");
        return;
    }
    try {
        const response = yield fetch("/collection/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: selectedGameId }),
        });
        const data = yield response.json();
        if (data.success) {
            alert("Game toegevoegd aan collectie!");
        }
    }
    catch (error) {
        console.error("Fout bij toevoegen:", error);
    }
}));
(_b = document.querySelector("[data-action='set-current']")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (!currentGameData) {
        alert("Kies eerst een game");
        return;
    }
    const container = document.getElementById("currentGame");
    const img = document.getElementById("currentGameImage");
    const name = document.getElementById("currentGameName");
    img.src = currentGameData.background_image;
    name.textContent = currentGameData.name;
    container === null || container === void 0 ? void 0 : container.classList.remove("hidden");
    container === null || container === void 0 ? void 0 : container.classList.add("flex");
});
(_c = document.getElementById("nextPage")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    currentPage++;
    loadGames();
    document.getElementById("pageNumber").textContent = currentPage.toString();
});
(_d = document.getElementById("prevPage")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadGames();
        document.getElementById("pageNumber").textContent = currentPage.toString();
    }
});
loadGames();
export {};
