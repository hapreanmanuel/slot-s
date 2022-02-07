import express from "express";
import {roll, simulate} from "./game/game";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );


app.get( "/roll", (req, res) => {
    res.send(roll());
});

app.get( "/simulate/:size", (req, res) => {
    res.send(simulate(Number(req.params.size)));
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );