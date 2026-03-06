interface Ratings {
  id: number;
  name: string;
  count: number;
  percent: number;
}

interface Games {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Ratings;
}

console.log("TEST");

interface ApiResponse {
  results: Games[];
}

(async function () {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d",
    );
    const games: ApiResponse = await response.json();

    const grid: HTMLElement | null = document.getElementById("gamesGrid");

    games.results.forEach((game) => {
      const gameDiv = document.createElement("div");
      gameDiv.className =
        "cursor-pointer border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500";

      const img = document.createElement("img");
      img.src = game.background_image;
      img.className = "w-full h-48 object-cover border border-gray-500 ";

      const title = document.createElement("div");
      title.className = "p-2 text-center font-bold";
      title.textContent = game.name;

      gameDiv.appendChild(img);
      gameDiv.appendChild(title);
      grid?.appendChild(gameDiv);

      gameDiv.addEventListener("click", () => {
        const titleClick = document.getElementById("gameName");
        const imgClick = document.getElementById(
          "gameImage",
        ) as HTMLImageElement;
        const releaseClick = document.getElementById("gameRelease");
        const playtimeClick = document.getElementById("gamePlaytime"); // PLAYTIME NOG TOEVOEGEN!!!

        if (titleClick) titleClick.textContent = game.name;

        if (imgClick) imgClick.src = game.background_image;
        if (releaseClick)
          releaseClick.textContent = `Released: ${game.released}`;
        if (playtimeClick)
          playtimeClick.textContent = `Rating: ${game.rating} / ${game.rating_top}`;
      });
    });
  } catch (error: any) {
    console.log(error);
  }
})();
