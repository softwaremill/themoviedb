import * as React from "react";
import { MovieSearchResult } from "../../../model/movie";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/pagination/pagination";
import "./movie-list.css";

interface MovieListProps {
    query: string;
    movies: MovieSearchResult[],
    currPage: number;
    totalPages: number;
    loadMovies: (page: number, immediate: boolean) => void;
}

export const MovieList = (props: MovieListProps) => {
    return <div className="ui container movie-list search-results">
        <div className="ui four stackable cards">
            {props.movies.map(movie => <MovieCard movie={movie} key={`movie/${movie.id}`}/>)}
        </div>
        {props.movies.length > 0 && <div>
            <Pagination
                currPage={props.currPage}
                totalPages={props.totalPages}
                onPageChange={page => props.loadMovies(page, true)}/>
        </div>}
    </div>
};

export const MovieCard = (props: { movie: MovieSearchResult }) => {
    const movieRating = (votes: number) => Math.round((votes || 0) * 0.5);
    const movie = props.movie;
    return <div className="card movie-card">
        <div className="image">
            {movie.poster_path && <img src={`${IMAGE_URL}/w185${movie.poster_path}`}/>}
        </div>
        <div className="content">
            <Link to={`/movie/${movie.id}`}
                className="header">{movie.title || movie.original_title || movie.name}</Link>
        </div>
        <div className="extra">
            Rating:
            <div className="ui star rating" data-rating={movieRating(movie.vote_average)}/>
        </div>
    </div>;
};
