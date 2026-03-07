import { Movie } from "./movie.model.js";

export interface MultipleWinners {
    id: number;
    name: string;
    movies: Movie[];
}