import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";

const rootDir = __dirname;

const app = express();

app.use(bodyParser.json({
    limit: '150mb'
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

app.use("/", express.static(rootDir, { 'maxAge': '14d' }));

http.createServer(app).listen(3000, () => {
    console.log(`Server started at port 3000, root: ${rootDir}`);
});