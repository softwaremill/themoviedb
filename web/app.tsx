import * as React from "react"
import * as ReactDOM from "react-dom"
import * as fetch from "isomorphic-fetch";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"
import "./declarations";

require('es6-promise').polyfill();
import "./app.css";

import { MovieSearchResult, MovieSearchResults } from "../model/movie";
import { Pagination } from "./components/pagination";
import { MovieDetails } from "./views/movie-details/movie-details";

require("semantic-ui-css/semantic.css");
require("semantic-ui-css/semantic.js");

interface AppState {
    movies?: MovieSearchResult[];
    query?: string;
    currPage?: number;
    totalPages?: number;
    loading?: boolean;
}

class App extends React.Component<{}, AppState> {
    private queryTimerId: any;

    constructor() {
        super();
        this.state = {
            movies: [],
            query: '',
            currPage: 1,
            totalPages: 1,
            loading: false
        }
    }
    
    componentDidMount() {
        (this.refs['searchBox'] as HTMLElement).focus();
    }
    
    loadMovies(immediate = false) {
        if (this.queryTimerId) {
            clearTimeout(this.queryTimerId);
        }
        this.queryTimerId = setTimeout(() => {
            if (this.state.query.trim() !== "") {
                this.setState({
                    loading: true
                });
                fetch(`${SERVER_URL}/search/${this.state.query}/${this.state.currPage}`)
                    .then(data => data.json())
                    .then((data: MovieSearchResults) => {
                        this.setState({
                            movies: data.results,
                            currPage: Math.max(1, data.page),
                            totalPages: Math.max(1, data.total_pages),
                            loading: false
                        }, () => {
                            $('.ui.rating').rating({
                                initialRating: 0,
                                maxRating: 5
                            })
                        });
                    }).catch(err => {
                        this.setState({
                            loading: false
                        });
                    });
            } else if (immediate) {
                this.setState({
                    movies: [],
                    currPage: 1,
                    totalPages: 1,
                    loading: false
                })
            }
        }, immediate ? 0 : 2000);
    }
    
    updateQuery(e: any) {
        this.setState({
            query: e.target.value,
            currPage: 1
        }, () => {
            this.loadMovies();
        });
    }
    
    updatePage(page: number) {
        this.setState({
            currPage: page
        }, () => {
            this.loadMovies(true);
        });
    }
    
    render() {
        const movieRating = (votes: number) => Math.round((votes || 0) * 0.5);
        return <div>
            <div className="ui top fixed inverted menu">
                <div className="ui container search-box">
                    <a href="#" className="header item">
                        <img className="logo" src="/movie.png"/>
                        Movie browser
                    </a>
                    <div className="ui transparent inverted icon input search-box">
                        <i className="search icon"/>
                        <input type="text" placeholder="Search movie"
                            ref="searchBox"
                            value={this.state.query}
                            onChange={e => this.updateQuery(e)}
                            onKeyDown={e => {
                                if (e.keyCode == 13) {
                                    this.loadMovies(true);
                                }
                            }}/>
                    </div>
                </div>
                {this.state.loading && <div className="loader"/>}
            </div>
            <div className="ui container search-results">
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
        </div>
    }
}

const Main = () => <Router>
    <div>
        <Route exact path="/" component={App}/>
        <Route path="/movie/:movieId" component={MovieDetails}/>
    </div>
</Router>;

ReactDOM.render(<Main/>, document.getElementById('app'));