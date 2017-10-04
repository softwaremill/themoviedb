import * as React from "react";
import { MovieSearchResult, MovieSearchResults } from "../../../model/movie";
import { Link } from "react-router-dom";
import * as fetch from "isomorphic-fetch";
import { Pagination } from "../../components/pagination/pagination";

interface MovieListProps {
    query: string;
    onLoad: (loading: boolean) => void;
}

interface MovieListState {
    movies?: MovieSearchResult[];
    currPage?: number;
    totalPages?: number;
}

export class MovieList extends React.Component<MovieListProps, MovieListState> {
    private queryTimerId: any;
    
    constructor() {
        super();
        this.state = {
            movies: [],
            currPage: 1,
            totalPages: 1
        }
    }

    updatePage(page: number) {
        this.setState({
            currPage: page
        }, () => {
            this.loadMovies(this.props.query, this.state.currPage, true);
        });
    }
    
    componentWillReceiveProps(prevProps: MovieListProps) {
        if (prevProps.query !== this.props.query) {
            this.setState({
                currPage: 1
            }, () => {
                this.loadMovies(this.props.query || '', this.state.currPage);
            });
        }
    }
    
    componentWillUnmount() {
        if (this.queryTimerId) {
            clearTimeout(this.queryTimerId);
        }
    }

    loadMovies(query: string, page: number, immediate = false) {
        if (this.queryTimerId) {
            clearTimeout(this.queryTimerId);
        }
        this.queryTimerId = setTimeout(() => {
            if (query.trim() !== "") {
                this.props.onLoad(true);
                fetch(`${SERVER_URL}/search/${query}/${page}`)
                    .then(data => data.json())
                    .then((data: MovieSearchResults) => {
                        this.props.onLoad(false);
                        this.setState({
                            movies: data.results,
                            currPage: Math.max(1, data.page),
                            totalPages: Math.max(1, data.total_pages)
                        }, () => {
                            $('.ui.rating').rating({
                                initialRating: 0,
                                maxRating: 5
                            })
                        });
                    }).catch(err => {
                        this.props.onLoad(false);
                    });
            } else if (immediate) {
                this.setState({
                    movies: [],
                    currPage: 1,
                    totalPages: 1
                })
            }
        }, immediate ? 0 : 2000);
    }

    render() {
        const movieRating = (votes: number) => Math.round((votes || 0) * 0.5);
        return <div className="ui container search-results">
            <div className="ui four stackable cards">
                {this.state.movies.map(movie => 
                    <div className="card" key={`movie/${movie.id}`}>
                        <div className="image">
                            {movie.poster_path && <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}/>}
                        </div>
                        <div className="content">
                            <Link to={`/movie/${movie.id}`} className="header">{movie.title || movie.original_title || movie.name}</Link>
                        </div>
                        <div className="extra">
                            Rating:
                            <div className="ui star rating" data-rating={movieRating(movie.vote_average)}/>
                        </div>
                    </div>
                )}
            </div>
            {this.state.movies.length > 0 && <div>
                <Pagination
                    currPage={this.state.currPage}
                    totalPages={this.state.totalPages}
                    onPageChange={page => this.updatePage(page)}/>
            </div>}
        </div>
    }
}
