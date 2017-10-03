interface MovieImages {
    id: number;
    backdrops: MovieImage[];
    posters: MovieImage[];
}

interface MovieImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface InfoOptions {
    id: number;
    language?: string;
}

interface SearchResults {
    page: number;
    results: SearchResult[];
    total_pages: number;
    total_results: number;
}

interface SearchResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_title: string;
    release_date: Date;
    poster_path: string;
    popularity: number;
    title: string;
    vote_average: number;
    vote_count: number;
}

interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    name: string;
}

interface ProductionCountry {
    iso_3166_1: number;
    name: string;
}

interface SpokenLanguage {
    iso_639_1: number;
    name: string;
}
    
export class MovieDb {
    constructor(private apiKey: string) {}

    apiReq(cmd: string, params: string): string {
        return `https://api.themoviedb.org/3/${cmd}?api_key=${this.apiKey}&${params}`;
    }
    
    searchMovie(query: string, page: number = 1): Promise<SearchResults> {
        return fetch(this.apiReq('search/multi', `query=${query}&page=${page}`))
            .then(data => data.json());
    }
    
    //movieInfo(options: InfoOptions): Promise<Movie> {
    //}
    //movieImages(options: InfoOptions, callback: (err: any, images: MovieImages) => void): void;
    
}
