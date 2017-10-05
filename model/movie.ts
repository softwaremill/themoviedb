export interface MovieSearchResults {
    page: number;
    results: MovieSearchResult[];
    total_pages: number;
    total_results: number;
}

export interface MovieSearchResult {
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
    name: string;
}

export interface Movie {
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
