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
            const response = yield fetch('https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d');
            const games = yield response.json();
            const grid = document.getElementById("gamesGrid");
            games.results.forEach(game => {
                const gameDiv = document.createElement("div");
                // Tailwind classes: we voegen een gradient overlay toe zodat de witte tekst leesbaar is
                gameDiv.className = "relative cursor-pointer border-2 border-slate-700 flex items-end h-80 bg-cover bg-center text-white font-bold rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500";
                gameDiv.style.backgroundImage = `url(${game.background_image})`;
                // Gebruik een innerHTML voor een mooie tekst-overlay onderaan
                gameDiv.innerHTML = `
                <div class="bg-gradient-to-t from-black/80 to-transparent w-full p-4">
                    ${game.name}
                </div>
            `;
                grid === null || grid === void 0 ? void 0 : grid.appendChild(gameDiv);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
})();
