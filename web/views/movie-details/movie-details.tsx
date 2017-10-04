import * as React from "react";
import { Movie } from "../../../model/movie";
import { match } from "react-router-dom";
import * as fetch from "isomorphic-fetch";
import "./movie-details.css";

interface MovieDetailsProps {
    match?: match<{ movieId: number }>;
}

interface MovieDetailsState {
    movie: Movie;
}

export class MovieDetails extends React.Component<MovieDetailsProps, MovieDetailsState> {
    constructor() {
        super();
        this.state = {
            movie: {} as Movie
        };
    }
    componentDidMount() {
        fetch(`${SERVER_URL}/movie/${this.props.match.params.movieId}`)
            .then(data => data.json())
            .then((data: Movie) => {
                this.setState({
                    movie: data
                })
            });
    }
    
    render() {
        const movie = this.state.movie;
        return <div className="movie-details">
            <div className="ui top fixed inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        <img className="logo" src="/movie.png"/>
                        Movie browser
                    </a>
                    <div className="item">
                        {movie.title || movie.original_title}
                    </div>
                </div>
            </div>
            <div className="ui two column centered grid movie-result">
                <div className="four column centered row">
                    <div className="column">
                        {movie.poster_path && <img src={`${IMAGE_URL}/w185${movie.poster_path}`}/>}
                    </div>
                    <div className="column">
                        {movie.backdrop_path && <img src={`${IMAGE_URL}/w185${movie.backdrop_path}`}/>}
                    </div>
                </div>
                <div className="four column centered row">
                    <div className="column">
                        {movie.overview}
                    </div>
                    <div className="column">
                        {movie.tagline}
                    </div>
                </div>
            </div>
        </div>            
    }
}
