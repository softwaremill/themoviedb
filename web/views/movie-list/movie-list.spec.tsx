import "../../declarations.ts";
import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import { MovieCard, MovieList } from "./movie-list";
import { MovieSearchResult } from "../../../model/movie";
import { BrowserRouter as Router } from "react-router-dom";

require('es6-promise').polyfill();

describe("Movie list", () => {

    const makeMovie = (n: number) => ({
        id: n,
        poster_path: `/${n}.jpg`,
        title: `Rambo ${n}`,
        vote_average: 5
    } as MovieSearchResult);

    it("should render a list with 10 cards", () => {
        const movies = [];
        for (let i = 1; i <= 10; i++) {
            movies.push(makeMovie(i));
        }

        const renderedMovieList: any = TestUtils.renderIntoDocument(
            <Router>
                <MovieList query="rambo" movies={movies} currPage={1} totalPages={1} loadMovies={() => {}}/>
            </Router>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(renderedMovieList, "movie-card").length).toBe(10);
    });

    it("should render a movie card", () => {
        const movie = makeMovie(5);
        const renderedMovieCard: any = TestUtils.renderIntoDocument(
            <Router>
                <MovieCard movie={movie}/>
            </Router>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithTag(renderedMovieCard, "img")[0].getAttribute("src")).toBe(`${IMAGE_URL}/w185${movie.poster_path}`);
    });
});