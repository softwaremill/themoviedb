import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./declarations";

require('es6-promise').polyfill();
import "./app.css";

import { MovieDetails } from "./views/movie-details/movie-details";
import { MovieList } from "./views/movie-list/movie-list";
import { MovieListInfo, MovieService } from "./services/movie-service/movie-service";
import { MovieSearchResult } from "../model/movie";

require("semantic-ui-css/semantic.css");
require("semantic-ui-css/semantic.js");

const movieService = new MovieService();

interface AppState {
    query?: string;
    loading?: boolean;
    currPage?: number;
    totalPages?: number;
    movies?: MovieSearchResult[];

}

class App extends React.Component<{}, AppState> {
    private queryTimerId: any;

    constructor() {
        super();
        this.state = {
            query: '',
            loading: false,
            currPage: 1,
            totalPages: 1,
            movies: []
        }
    }
    
    componentDidMount() {
        (this.refs['searchBox'] as HTMLElement).focus();
        this.updateState(movieService.movieListInfo);
    }
    
    componentWillUnmount() {
        this.clearTimer();
    }
    
    updateQuery(e: any) {
        this.setState({
            query: e.target.value
        });
    }
    
    updateState(resp: MovieListInfo) {
        if (resp) {
            this.setState({
                movies: resp.movies ? resp.movies : this.state.movies,
                query: resp.query ? resp.query: this.state.query,
                currPage: resp.currPage ? resp.currPage : this.state.currPage,
                totalPages: resp.totalPages ? resp.totalPages : this.state.totalPages,
                loading: resp.loading
            }, () => {
                $('.ui.rating').rating({
                    initialRating: 0,
                    maxRating: 5
                })
            });
        }
    }
    
    clearTimer() {
        if (this.queryTimerId) {
            clearTimeout(this.queryTimerId);
        }
    }
    
    loadMovies(query: string, page: number, immediate: boolean) {
        const initialState: MovieListInfo = {
            movies: [],
            currPage: 1,
            totalPages: 1,
            loading: false
        };
        this.clearTimer();
        this.queryTimerId = setTimeout(() => {
            if (query.trim() !== "") {
                this.setState({
                    loading: true
                });
                movieService.loadMovies(query, page)
                    .then((data: MovieListInfo) => {
                        this.updateState(data);
                    })
                    .catch(err => {
                        this.updateState(initialState);
                    });

            } else if (immediate) {
                this.updateState(initialState);
            }
        }, immediate ? 0 : 2000);                
    }
    
    render() {
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
                                if (e.keyCode === 13) {
                                    this.loadMovies(this.state.query, 1, true);
                                }
                            }}/>
                    </div>
                </div>
                {this.state.loading && <div className="loader"/>}
            </div>
            <MovieList
                query={this.state.query}
                movies={this.state.movies}
                currPage={this.state.currPage}
                totalPages={this.state.totalPages}
                loadMovies={this.loadMovies.bind(this)}/>
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