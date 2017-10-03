import * as React from "react"
import * as ReactDOM from "react-dom"
import * as fetch from "isomorphic-fetch";
require('es6-promise').polyfill();
import "./app.css";

import { MovieSearchResult, MovieSearchResults } from "../model/movie";

declare function require(path: string): any;
declare const $: any;

require("semantic-ui-css/semantic.css");
require("semantic-ui-css/semantic.js");

interface AppState {
    movies?: MovieSearchResult[];
    query?: string;
}

class App extends React.Component<{}, AppState> {
    private queryTimerId: number;

    constructor() {
        super();
        this.state = {
            movies: [],
            query: ''
        }
    }
    
    updateQuery(e: any) {
        this.setState({
            query: e.target.value
        }, () => {
            if (this.queryTimerId) {
                clearTimeout(this.queryTimerId);
            }
            this.queryTimerId = setTimeout(this.queryMovies.bind(this), 2000);
        });
    }
    
    queryMovies() {
        fetch(`http://localhost:3000/search/${this.state.query}/1`)
            .then(data => data.json())
            .then((data: MovieSearchResults) => {
                this.setState({
                    movies: data.results
                }, () => {
                    $('.ui.rating').rating({
                        initialRating: 0,
                        maxRating: 5
                    })
                });
        })
    }
    
    render() {
        return <div>
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        <img className="logo" src="/movie.png"/>
                        Movie browser
                    </a>
                    <div className="ui transparent inverted icon input search-box">
                        <i className="search icon"/>
                        <input type="text" placeholder="Search movie" value={this.state.query} onChange={this.updateQuery.bind(this)}/>
                    </div>
                </div>
            </div>
            <div className="ui container search-results">
                <div className="ui four stackable cards">
                    {this.state.movies.map(movie => 
                        <div className="card" key={`movie-${movie.id}`}>
                            <div className="image">
                                <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}/>
                            </div>
                            <div className="content">
                                <a className="header">{movie.title || movie.original_title || movie.name}</a>
                            </div>
                            <div className="extra">
                                Rating:
                                <div className="ui star rating" data-rating={Math.round(movie.vote_average * 0.5)}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));