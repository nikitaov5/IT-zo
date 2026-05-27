export interface User {
  email: string;
  password: string;
  collection?: number[]; // game IDs
  gtgScore?: number;
  currentGame?: number;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Games {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic?: number;

  platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];

  genres: {
    id: number;
    name: string;
  }[];

  screenshots: Screenshot[];
}
