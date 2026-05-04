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
}
