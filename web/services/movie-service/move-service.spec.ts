import "../../declarations.ts";
import { MovieSearchResult, MovieSearchResults } from "../../../model/movie";
import { MovieListInfo, MovieService } from "./movie-service";
require('es6-promise').polyfill();


describe("Movie service", () => {

    const movieService = new MovieService();
    
    const movieSearchResults: MovieSearchResults = {
        total_pages: 10,
        results: [],
        total_results: 40,
        page: 1
    };
    const movieListInfo = {
        movies: [] as MovieSearchResult[],
        query: "barbie",
        currPage: 1,
        totalPages: 10,
        loading: false
    };

    beforeEach((done) => {
        jasmine.Ajax.install();
        done();
    });
    
    afterEach(() => {
        jasmine.Ajax.uninstall();
    });
    
    it("should fetch movie list info", (done) => {
        jasmine.Ajax.stubRequest(`${SERVER_URL}/search/barbie/1`).andReturn({
            status: 200,
            contentType: 'application/json',
            responseText: JSON.stringify(movieSearchResults)
        });

        movieService.loadMovies('barbie', 1).then((data: MovieListInfo) => {
            expect(data).toEqual(movieListInfo);
            done();
        });
    });
});
