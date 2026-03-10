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
console.log("TEST");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d");
            let games = yield response.json();
            /*
            games = games.filter((game) => {
              game.esrb_rating.id != 4
            }) */
            const grid = document.getElementById("gamesGrid");
            games.results.forEach((game) => {
                if (!game.background_image)
                    return; // sla games zonder afbeelding over
                const gameDiv = document.createElement("div");
                gameDiv.className =
                    "cursor-pointer border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500";
                const img = document.createElement("img");
                img.src = game.background_image;
                img.className = "w-full aspect-video object-cover border border-gray-500 ";
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
                    //const playtimeClick = document.getElementById("gamePlaytime");
                    const ratingClick = document.getElementById("gameRating");
                    if (titleClick)
                        titleClick.textContent = game.name;
                    if (imgClick)
                        imgClick.src = game.background_image;
                    if (releaseClick)
                        releaseClick.textContent = `Released: ${game.released}`;
                    //if (playtimeClick)
                    //playtimeClick.textContent = `Playtime: ${game.playtime} uur`;
                    if (ratingClick)
                        ratingClick.textContent = `Rating: ${game.rating}`;
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
})();
