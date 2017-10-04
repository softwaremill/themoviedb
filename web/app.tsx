import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./declarations";

require('es6-promise').polyfill();
import "./app.css";

import { MovieDetails } from "./views/movie-details/movie-details";
import { MovieList } from "./views/movie-list/movie-list";

require("semantic-ui-css/semantic.css");
require("semantic-ui-css/semantic.js");

interface AppState {
    query?: string;
    loading?: boolean;
}

class App extends React.Component<{}, AppState> {

    constructor() {
        super();
        this.state = {
            query: '',
            loading: false
        }
    }
    
    componentDidMount() {
        (this.refs['searchBox'] as HTMLElement).focus();
    }
    
    updateQuery(e: any) {
        this.setState({
            query: e.target.value
        });
    }
    
    updateLoading(loading: boolean) {
        this.setState({
            loading: loading
        });
    }
    
    updateMovieList() {
        const movieList = this.refs["movieList"] as MovieList;
        movieList.loadMovies(this.state.query, 1, true);
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
                                    this.updateMovieList();
                                }
                            }}/>
                    </div>
                </div>
                {this.state.loading && <div className="loader"/>}
            </div>
            <MovieList ref="movieList"
                query={this.state.query}
                onLoad={loading => this.updateLoading(loading)}/>
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