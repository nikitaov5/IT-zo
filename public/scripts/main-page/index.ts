import { ObjectId } from "mongodb";
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

export interface Games {
  _id?: ObjectId;
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  playtime: number;
  rating_top: number;
  ratings: Ratings[];
  esrb_rating: EsrbRating;
  platforms: PlatformWrapper[];
  genres: Genre[];
  stores: Store[];
}

interface ApiResponse {
  results: Games[];
}

let currentPage = 1;
async function loadGames() {
  try {
    const response = await fetch(`/home?page=${currentPage}`);
    let games: Games[] = await response.json();

    const grid = document.getElementById("gamesGrid");
    if (!grid) return;
    grid.innerHTML = "";

    games.forEach((game) => {
      if (!game.background_image) return; // sla games zonder afbeelding over
      
      const gameDiv = document.createElement("div");
      gameDiv.className =
        "cursor-pointer border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl transition hover:scale-[1.02] hover:border-indigo-500";

      const img = document.createElement("img");
      img.src = game.background_image;
      
      const title = document.createElement("div");
 
      title.textContent = game.name;

      gameDiv.appendChild(img);
      gameDiv.appendChild(title);
      grid?.appendChild(gameDiv);

      gameDiv.addEventListener("click", () => {
      document.getElementById("gameName")!.textContent = game.name;
      (document.getElementById("gameImage") as HTMLImageElement).src =
      game.background_image;

      document.getElementById("gameRelease")!.textContent =
      `Released: ${game.released}`;

      document.getElementById("gamePlaytime")!.textContent =
      `Average Playtime: ${game.playtime} uur`;

      document.getElementById("gameRating")!.textContent =
      `Rating: ${game.rating}/5`;

      document.getElementById("gamePlatform")!.textContent =
      `Platforms: ${game.platforms.map(p => p.platform.name).join(", ")}`;

      document.getElementById("gameGenre")!.textContent =
      `Genres: ${game.genres.map(g => g.name).join(", ")}`;
});;
    });
  } catch (error: any) {
    console.log(error);
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

window.addEventListener("DOMContentLoaded", () => {
  loadGames();
});
