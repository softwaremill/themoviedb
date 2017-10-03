
import { MovieSearchResults } from "../model/movie";

export class MovieDb {
    constructor(private apiKey: string) {}

    apiReq(cmd: string, params: string): string {
        return `https://api.themoviedb.org/3/${cmd}?api_key=${this.apiKey}&${params}`;
    }
    
    searchMovie(query: string, page: number = 1): Promise<MovieSearchResults> {
        return fetch(this.apiReq('search/multi', `query=${query}&page=${page}`))
            .then(data => data.json());
    }
    
    //movieInfo(options: InfoOptions): Promise<MovieInfo> {
    //}
    //movieImages(options: InfoOptions, callback: (err: any, images: MovieImages) => void): void;
    
}
