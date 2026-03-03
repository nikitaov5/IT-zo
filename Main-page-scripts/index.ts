interface Ratings {
    id: number,
    name: string,
    count: number,
    percent: number
}

interface Games {
    id: number,
    name: string,
    released: string,
    background_image: string,
    rating: number,
    rating_top: number,
    ratings: Ratings;
}

console.log("TEST")

interface ApiResponse {
    results: Games[];
}

(async function () {
    try {
        const response = await fetch('https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d');
        const games: ApiResponse = await response.json();

        const grid: HTMLElement | null = document.getElementById("gamesGrid");

        games.results.forEach(game => {

            const gameDiv = document.createElement("div");
            gameDiv.className = "cursor-pointer border-2 border-slate-700 flex items-end justify-center h-80 bg-cover bg-center text-white font-bold rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500 relative";
            gameDiv.textContent = game.name;
            gameDiv.style.backgroundImage = `url(${game.background_image})`;
            grid?.appendChild(gameDiv);
        });

    } catch (error: any) {
        console.log(error);
    }
})();