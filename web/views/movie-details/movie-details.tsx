import * as React from "react";
import { Movie } from "../../../model/movie";
import { match } from "react-router-dom";
import * as fetch from "isomorphic-fetch";

interface MovieDetailsProps {
    match?: match<{ movieId: number }>;
}

export class MovieDetails extends React.Component<MovieDetailsProps, {}> {
    componentDidMount() {
        fetch(`${SERVER_URL}/movie/${this.props.match.params.movieId}`)
            .then(data => data.json())
            .then((data: Movie) => {
                console.log(data);
            })
    }
    
    render() {
        return <div/>;
    }
}
