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

interface Genre {
  name: string;
}

interface Store {
  name: string;
  image_background: string;
}

interface Platform {
  name: string;
  image_background: string;
}

interface PlatformWrapper {
  platform: Platform;
}

interface Games {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  playtime: number;
  rating_top: number;
  ratings: Ratings;
  esrb_rating: EsrbRating;
  platforms: PlatformWrapper[];
  genres: Genre[];
  stores: Store[];
}

interface ApiResponse {
  results: Games[];
}

let currentPage = 1;
async function loadGames(page: number) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d&page=${page}`,
    );
    let games: ApiResponse = await response.json();

    /*
    let filteredGames: Games[] = games.results.filter((game) => {
      game.esrb_rating.id = 4;
    }); */

    const grid = document.getElementById("gamesGrid");
    if (!grid) return;
    grid.innerHTML = "";

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
        const platformClick = document.getElementById("gamePlatform");
        const genreClick = document.getElementById("gameGenre");
        const storeClick = document.getElementById(
          "gameStore",
        ) as HTMLImageElement;

        if (titleClick) titleClick.textContent = game.name;
        if (imgClick) imgClick.src = game.background_image;
        if (releaseClick)
          releaseClick.textContent = `Released: ${game.released}`;
        if (playtimeClick)
          playtimeClick.textContent = `Average Playtime: ${game.playtime} uur`;
        if (ratingClick) ratingClick.textContent = `Rating: ${game.rating}/5`;
        if (platformClick && genreClick /*&& storeClick */) {
          platformClick.textContent = `Available Platforms: ${game.platforms.map((p) => p.platform.name).join(", ")}`;
          genreClick.textContent = `Genres: ${game.genres.map((p) => p.name).join(", ")}`;
          //storeClick.src = `Available stores: ${game.stores.map((p) => p.image_background).join(", ")}`;
        }
      });
    });
  } catch (error: any) {
    console.log(error);
  }
}

document.getElementById("nextPage")?.addEventListener("click", () => {
  currentPage++;
  loadGames(currentPage);
  document.getElementById("pageNumber")!.textContent = currentPage.toString();
});

document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadGames(currentPage);
    document.getElementById("pageNumber")!.textContent = currentPage.toString();
  }
});

loadGames(1);
