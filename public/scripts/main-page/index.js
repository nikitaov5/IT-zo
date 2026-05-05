"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
let currentPage = 1;
function loadGames(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d&page=${page}`);
            let games = yield response.json();
            /*
            let filteredGames: Games[] = games.results.filter((game) => {
              game.esrb_rating.id = 4;
            }); */
            const grid = document.getElementById("gamesGrid");
            if (!grid)
                return;
            grid.innerHTML = "";
            games.results.forEach((game) => {
                if (!game.background_image)
                    return; // sla games zonder afbeelding over
                const gameDiv = document.createElement("div");
                gameDiv.className =
                    "cursor-pointer border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500";
                const img = document.createElement("img");
                img.src = game.background_image;
                img.className =
                    "w-full aspect-video object-cover border border-gray-500 ";
                const title = document.createElement("div");
                title.className = "p-2 text-center font-bold";
                title.textContent = game.name;
                gameDiv.appendChild(img);
                gameDiv.appendChild(title);
                grid === null || grid === void 0 ? void 0 : grid.appendChild(gameDiv);
                gameDiv.addEventListener("click", () => {
                    const titleClick = document.getElementById("gameName");
                    const imgClick = document.getElementById("gameImage");
                    const releaseClick = document.getElementById("gameRelease");
                    const playtimeClick = document.getElementById("gamePlaytime");
                    const ratingClick = document.getElementById("gameRating");
                    const platformClick = document.getElementById("gamePlatform");
                    const genreClick = document.getElementById("gameGenre");
                    const storeClick = document.getElementById("gameStore");
                    if (titleClick)
                        titleClick.textContent = game.name;
                    if (imgClick)
                        imgClick.src = game.background_image;
                    if (releaseClick)
                        releaseClick.textContent = `Released: ${game.released}`;
                    if (playtimeClick)
                        playtimeClick.textContent = `Average Playtime: ${game.playtime} uur`;
                    if (ratingClick)
                        ratingClick.textContent = `Rating: ${game.rating}/5`;
                    if (platformClick && genreClick /*&& storeClick */) {
                        platformClick.textContent = `Available Platforms: ${game.platforms.map((p) => p.platform.name).join(", ")}`;
                        genreClick.textContent = `Genres: ${game.genres.map((p) => p.name).join(", ")}`;
                        //storeClick.src = `Available stores: ${game.stores.map((p) => p.image_background).join(", ")}`;
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
(_a = document.getElementById("nextPage")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    currentPage++;
    loadGames(currentPage);
    document.getElementById("pageNumber").textContent = currentPage.toString();
});
(_b = document.getElementById("prevPage")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadGames(currentPage);
        document.getElementById("pageNumber").textContent = currentPage.toString();
    }
});
loadGames(1);
