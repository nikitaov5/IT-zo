export interface User {
  email: string;
  password: string;
  collection?: number[]; // game IDs
}
