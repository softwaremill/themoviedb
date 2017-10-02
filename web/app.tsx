import * as React from "react"
import * as ReactDOM from "react-dom"

declare function require(path: string): any;

require("semantic-ui-css/semantic.css");

class App extends React.Component {
    render() {
        return <div>
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        <img className="logo" src="/movie.png"/>
                        Movie browser
                    </a>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));