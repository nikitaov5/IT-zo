interface Ratings {
  id: number;
  name: string;
  count: number;
  percent: number;
}

interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

interface Games {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  playtime: number;
  rating_top: number;
  ratings: Ratings[];
  esrb_rating: EsrbRating[];
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
    let games: ApiResponse = await response.json();
    /*
    games = games.filter((game) => {
      game.esrb_rating.id != 4
    }) */

    const grid: HTMLElement | null = document.getElementById("gamesGrid");

    games.results.forEach((game) => {
      if (!game.background_image) return; // sla games zonder afbeelding over
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
      grid?.appendChild(gameDiv);

      gameDiv.addEventListener("click", () => {
        const titleClick = document.getElementById("gameName");
        const imgClick = document.getElementById(
          "gameImage",
        ) as HTMLImageElement;
        const releaseClick = document.getElementById("gameRelease");
        const playtimeClick = document.getElementById("gamePlaytime");
        const ratingClick = document.getElementById("gameRating");

        if (titleClick) titleClick.textContent = game.name;
        if (imgClick) imgClick.src = game.background_image;
        if (releaseClick)
          releaseClick.textContent = `Released: ${game.released}`;
        if (playtimeClick)
          playtimeClick.textContent = `Playtime: ${game.playtime} uur`;
        if (ratingClick) ratingClick.textContent = `Rating: ${game.rating}`;
      });
    });
  } catch (error: any) {
    console.log(error);
  }
})();
