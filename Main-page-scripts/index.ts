interface Ratings {
    id: number,
    name: string,
    count: number,
    percent: number
}

interface Games {
    id: number,
    name: string,
    released: Date,
    background_image: ImageData,
    rating: number,
    rating_top: number,
    ratings: Ratings;
}



(async function () {
    try {
        const response = await fetch('https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d');
        const games : Games = await response.json();
        console.log(games);
    } catch (error: any) {
        console.log(error);
    }
})();