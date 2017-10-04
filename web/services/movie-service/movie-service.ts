import { MovieSearchResult, MovieSearchResults } from "../../../model/movie";
import * as fetch from "isomorphic-fetch";

export interface MovieListInfo {
    movies?: MovieSearchResult[];
    query?: string;
    currPage?: number;
    totalPages?: number;
    loading: boolean;
}

export class MovieService {
    private queryTimerId: any;
    public movieListInfo: MovieListInfo;
    
    clear() {
        if (this.queryTimerId) {
            clearTimeout(this.queryTimerId);
        }
    }
    
    loadMovies(query: string, page: number, immediate: boolean, onLoad: (resp: MovieListInfo) => void) {
        this.clear();
        this.queryTimerId = setTimeout(() => {
            if (query.trim() !== "") {
                onLoad({
                    loading: true
                });
                fetch(`${SERVER_URL}/search/${query}/${page}`)
                    .then(data => data.json())
                    .then((data: MovieSearchResults) => {
                        const movieListInfo = {
                            movies: data.results,
                            query: query,
                            currPage: Math.max(1, data.page),
                            totalPages: Math.max(1, data.total_pages),
                            loading: false
                        };
                        this.movieListInfo = movieListInfo;
                        onLoad(movieListInfo);
                    }).catch(err => {
                        onLoad({
                            movies: [],
                            currPage: 1,
                            totalPages: 1,
                            loading: false
                        });
                    });
            } else if (immediate) {
                onLoad({
                    movies: [],
                    currPage: 1,
                    totalPages: 1,
                    loading: false
                });
            }
        }, immediate ? 0 : 2000);
    }
}