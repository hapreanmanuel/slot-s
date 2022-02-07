"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roll = exports.simulate = void 0;
const Item_1 = require("./models/Item");
const Reward_1 = require("./models/Reward");
const Statistic_1 = require("./models/Statistic");
// standard win factory multipliers for reusability
const basicWin = [0, 0, 4, 10, 40];
const bigWin = [0, 0, 10, 40, 100];
const items = [
    // new Item('J', 2, basicWin),
    // new Item('Q', 2, basicWin),
    // new Item('K', 2, basicWin),
    new Item_1.Item('A', 2, basicWin),
    // new Item('W1', 1, bigWin),
    // new Item('W2', 1, bigWin),
    new Item_1.Item('S', 1, [0, 0, 20, 200, 1000])
];
const numberOfColumns = 5;
const visibleItemsPerColumn = 3;
// Array of elements storing all items with respect to occurrence count
let columnItems = [];
items.forEach(item => {
    columnItems = [...columnItems, ...Array(item.occurrence).fill(item.symbol)];
    ;
});
// 0 based index on each column that form a winning line.
// E.g. 1 1 1 1 1 represent the middle line
const lineConfiguration = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2]
];
// Return a matrix where first index represents column number and second index represents the row
// Assign each entry a random symbol from the available items on each column
function getRandomScreen() {
    const result = [];
    for (let i = 0; i < numberOfColumns; i++) {
        result[i] = [];
        const uniqueDigits = new Set();
        // Fill with random numbers from 0 up to the last index of the available items in each column
        while (visibleItemsPerColumn > uniqueDigits.size) {
            const nextRngNmb = Math.floor(Math.random() * columnItems.length);
            uniqueDigits.add(nextRngNmb);
        }
        uniqueDigits.forEach(uniqueIndex => {
            // console.log("unique index: " + uniqueIndex +" . related symbol: " + columnItems[uniqueIndex]);
            result[i].push(columnItems[uniqueIndex]);
        });
    }
    return result;
}
function simulate(size) {
    let screen;
    let reward;
    let total = 0;
    const statistics = [];
    // Roll as many times as asked, collect statistics
    for (let loop = 0; loop < size; loop++) {
        screen = getRandomScreen();
        // tslint:disable-next-line:no-console
        console.log("Screen: " + screen);
        reward = checkWin(screen);
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
    return statistics;
}
exports.simulate = simulate;
// Each entry represents a column
// Lines are formed across columns based on certain definitions (like neighboring)
// To think how to make this reusable
// TODO refactor to return the winning lines from the screen
function checkWin(screen) {
    const reward = [];
    lineConfiguration.forEach(config => {
        // tslint:disable-next-line:no-console
        console.log("Checking line: " + config);
        const first = screen[0][config[0]]; // first element from line to check
        let current = first; // second element from line to check
        let counter = 0; // first element equal to itself
        // // Loop through
        // for(i = 1; i < numberOfColumns; i++) {
        //     counter ++;
        // }
        // let counter = 1;    // store how many elements in the line are identical to the first
        // // let i = 2;  // iterator for line
        // K K K K K
        // first = 0, current = 0, counter = 0
        // first = 0, current = 1, counter = 1
        // first = 0, current = 2, counter = 2
        // first = 0, current = 3, counter = 3
        // first = 0, current = 4, counter = 4
        // K A K K K
        // first = 0, current = 0, counter = 0
        // first = 0, current = 1, counter = 1
        // first = 0, current = 2, counter = 2
        while (first === current && counter <= numberOfColumns) {
            // console.log("First: " + first + " Current: " + current + " Counter: " + counter);
            counter++;
            if (counter < numberOfColumns) {
                current = screen[counter][config[counter]];
            }
        }
        const item = items.find(it => it.symbol === first);
        const winFactor = item.winFactor;
        // console.log("Item: " + JSON.stringify(item));
        // console.log("Win factor: " + winFactor);
        // console.log("Multiplier: " + JSON.stringify(winFactor[counter-1]));
        // counter is 1 based and index 0 based
        const multiplier = winFactor[counter - 1];
        // console.log("Win factor: " + item.winFactor + " Index: " + counter-1 +  " Multiplier: " +multiplier);
        if (multiplier > 0) {
            reward.push(new Reward_1.Reward(item.symbol, multiplier, config.splice(0, counter)));
        }
    });
    return reward;
}
function roll() {
    const screen = getRandomScreen();
    const reward = checkWin(screen);
    let total = 0;
    reward.forEach(winLine => {
        total += winLine.multiplier;
    });
    return [...screen[0].map((_, colIndex) => screen.map(row => row[colIndex])), "You have won a grand total: " + total];
}
exports.roll = roll;
// module.exports = {roll, simulate, checkWin};
//# sourceMappingURL=game.js.map