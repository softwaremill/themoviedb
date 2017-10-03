
import { Movie, MovieSearchResults } from "../model/movie";

export class MovieDb {
    constructor(private apiKey: string) {}

    apiReq(cmd: string, params?: string): string {
        return `https://api.themoviedb.org/3/${cmd}?api_key=${this.apiKey}${params ? `&${params}` : ''}`;
    }
    
    searchMovie(query: string, page: number = 1): Promise<MovieSearchResults> {
        return fetch(this.apiReq('search/multi', `query=${query}&page=${page}`))
            .then(data => data.json());
    }
    
    movieInfo(movieId: string): Promise<Movie> {
        return fetch(this.apiReq(`movie/${movieId}`))
            .then(data => data.json())
    }
    //movieImages(options: InfoOptions, callback: (err: any, images: MovieImages) => void): void;
    
}
