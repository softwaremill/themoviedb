import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import "isomorphic-fetch";
require('es6-promise').polyfill();

import { MovieDb } from "./moviedb";

const rootDir = __dirname;

const apiKey = 'c5106d6e4733418d29b43456de93c85c';
const movieDb = new MovieDb(apiKey);

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080"]
}));

app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));

app.get("/version", (req, resp) => {
    resp.send({
        version: "1.0"
    });
});

app.get('/search/:query/:page', (req, resp) => {
    movieDb.searchMovie(req.params.query, req.params.page).then(data => {
        resp.send(data);
    });
});

app.get('/movie/:id', (req, resp) => {
    movieDb.movieInfo(req.params.id).then(data => {
        resp.send(data);
    });
});

app.use("/", express.static(rootDir));
app.use("/", express.static(path.join(rootDir, "../assets")));

http.createServer(app).listen(3000, () => {
    console.log(`Server started at port 3000, root: ${rootDir}, ${path.join(rootDir, "../assets")}`);
});