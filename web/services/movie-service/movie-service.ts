import { Movie, MovieSearchResult, MovieSearchResults } from "../../../model/movie";
import axios from "axios";

export interface MovieListInfo {
    movies?: MovieSearchResult[];
    query?: string;
    currPage?: number;
    totalPages?: number;
    loading: boolean;
}

export class MovieService {
    public movieListInfo: MovieListInfo;
    
    loadMovies(query: string, page: number): Promise<MovieListInfo> {
        return axios.get(`${SERVER_URL}/search/${query}/${page}`)
            .then(data => data.data)
            .then((data: MovieSearchResults) => {
                const movieListInfo = {
                    movies: data.results,
                    query: query,
                    currPage: Math.max(1, data.page),
                    totalPages: Math.max(1, data.total_pages),
                    loading: false
                };
                this.movieListInfo = movieListInfo;
                return movieListInfo;
            });
    }

    loadMovie(movieId: number): Promise<Movie> {
        return axios.get(`${SERVER_URL}/movie/${movieId}`)
            .then(data => data.data)
    }
}