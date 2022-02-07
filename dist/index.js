"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_1 = require("./game/game");
const app = (0, express_1.default)();
const port = 8080; // default port to listen
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/roll", (req, res) => {
    res.json((0, game_1.roll)());
});
app.get("/simulate/:size", (req, res) => {
    res.send((0, game_1.simulate)(Number(req.params.size)));
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map