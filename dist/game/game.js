"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roll = exports.simulate = void 0;
const GameConfiguration_1 = require("./models/GameConfiguration");
const Item_1 = require("./models/Item");
const RewardScreen_1 = require("./models/RewardScreen");
const Statistic_1 = require("./models/Statistic");
const Sizzling = new GameConfiguration_1.GameConfiguration([
    new Item_1.Item('J', 6, [0, 0, 4, 10, 40]),
    new Item_1.Item('Q', 6, [0, 0, 4, 10, 40]),
    new Item_1.Item('K', 6, [0, 0, 4, 10, 40]),
    new Item_1.Item('A', 6, [0, 0, 4, 10, 40]),
    new Item_1.Item('W1', 3, [0, 0, 10, 40, 100]),
    new Item_1.Item('W2', 3, [0, 0, 10, 40, 100]),
    new Item_1.Item('*', 1, [0, 0, 2, 10, 50]),
    new Item_1.Item('7', 1, [0, 0, 20, 200, 1000])
], 5, 3, [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2]
]);
// Return a matrix where first index represents column number and second index represents the row
// Assign each entry a random symbol from the available items on each column
function getRandomScreen() {
    return Sizzling.getRandomScreen();
}
function simulate(size) {
    let screen;
    let reward;
    let total = 0;
    const statistics = [];
    // Roll as many times as asked, collect statistics
    for (let loop = 0; loop < size; loop++) {
        screen = getRandomScreen();
        // // tslint:disable-next-line:no-console
        // console.log("Screen: " + screen);
        reward = checkWin(screen);
        // // tslint:disable-next-line:no-console
        // console.log("Reward: " + reward);
        // console.log("loop count: " + loop);
        reward.forEach(wl => {
            total += wl.multiplier;
            const existingStatistic = statistics.find(s => s.symbol === wl.symbol && s.multiplier === wl.multiplier);
            if (existingStatistic === undefined) {
                statistics.push(new Statistic_1.Statistic(wl.symbol, wl.multiplier, 1));
            }
            else {
                existingStatistic.count++;
            }
        });
    }
    // tslint:disable-next-line:no-console
    console.log("Simulated attempts: " + size);
    return statistics;
}
exports.simulate = simulate;
// Each entry represents a column
// Lines are formed across columns based on certain definitions (like neighboring)
// To think how to make this reusable
// TODO refactor
function checkWin(screen) {
    return Sizzling.checkWin(screen);
}
function roll() {
    const screen = getRandomScreen();
    const reward = checkWin(screen);
    return new RewardScreen_1.RewardScreen(screen[0].map((_, colIndex) => screen.map(row => row[colIndex])), reward);
}
exports.roll = roll;
//# sourceMappingURL=game.js.map