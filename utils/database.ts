import { Collection, MongoClient } from "mongodb";
import { Games } from "../scripts/main-page";

export const client = new MongoClient("mongodb+srv://matthiasmets_db_user:matthiasmets@webontwikkeling.rgcmiid.mongodb.net/?appName=WebOntwikkeling");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        await seed();
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}

export const gameDataCollection: Collection<Games> = client.db("GameHubData").collection<Games>("GameHubData");
export async function getGames(page: number, limit: number = 20) {
    const skip = (page - 1) * limit;

    return await gameDataCollection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();
}

async function seed() {
    await gameDataCollection.deleteMany({})
    if (await gameDataCollection.countDocuments() === 0) {
        for (let i = 1; i <= 5; i++) {
            const response  = await fetch(`https://api.rawg.io/api/games?key=f261bf4dc1a84efeab97fb873bdedb9d&page=${i}`);
            const data = await response.json();
            
            await gameDataCollection.insertMany(data.results);
        }
        console.log("seeded database");
    }
}

