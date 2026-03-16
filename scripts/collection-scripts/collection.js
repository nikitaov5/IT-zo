let api = "https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d";

loadCollection();

async function loadCollection() {
  try {
    const response = await fetch(api);

    const data = await response.json();
    const games = data.results;

    const articles = document.querySelectorAll("article");

    articles.forEach((article, index) => {
      if (games[index]) {
        const game = games[index];
        const figure = article.querySelector("figure");
        const figcaption = article.querySelector("figcaption");

        // Add image
        const img = document.createElement("img");
        img.src = game.background_image;
        img.alt = game.name;
        img.className = "w-full object-cover aspect-video";

        // Update figcaption
        figcaption.textContent = game.name;

        // Insert image before figcaption
        figure.insertBefore(img, figcaption);
      }
    });
  } catch (error) {
    console.error("Failed to load games:", error);
  }
}
