import { ObjectId } from "mongodb";

export interface Ratings {
  id: number;
  name: string;
  count: number;
  percent: number;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  name: string;
}

export interface Store {
  name: string;
  image_background: string;
}

export interface Platform {
  name: string;
  image_background: string;
}

export interface PlatformWrapper {
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
