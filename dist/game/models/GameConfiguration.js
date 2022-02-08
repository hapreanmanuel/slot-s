"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameConfiguration = void 0;
const Reward_1 = require("./Reward");
class GameConfiguration {
    constructor(items, numberOfColumns, visibleItemsPerColumn, winningLines) {
        this.items = items;
        this.numberOfColumns = numberOfColumns;
        this.visibleItemsPerColumn = visibleItemsPerColumn;
        this.winningLines = winningLines;
        this.columnItems = [];
        items.forEach(item => {
            this.columnItems = [...this.columnItems, ...Array(item.occurrence).fill(item.symbol)];
            ;
        });
    }
    getItemBySymbol(symbol) {
        return this.items.find(it => it.symbol === symbol);
    }
    getRandomScreen() {
        const result = [];
        for (let i = 0; i < this.numberOfColumns; i++) {
            result[i] = [];
            const uniqueDigits = new Set();
            // Fill with random numbers from 0 up to the last index of the available items in each column
            while (this.visibleItemsPerColumn > uniqueDigits.size) {
                const nextRngNmb = Math.floor(Math.random() * this.columnItems.length);
                uniqueDigits.add(nextRngNmb);
            }
            uniqueDigits.forEach(uniqueIndex => {
                // console.log("unique index: " + uniqueIndex +" . related symbol: " + columnItems[uniqueIndex]);
                result[i].push(this.columnItems[uniqueIndex]);
            });
        }
        return result;
    }
    checkWin(screen) {
        // Each winning line treated individually
        return this.winningLines.map(line => {
            // Extract items based on line configuration from the screen
            const items = line.map((val, idx) => screen[idx][val]);
            // tslint:disable-next-line:no-console
            // console.log("For line " + line + " extracted items " + items);
            const item = this.getItemBySymbol(items[0]);
            // Find index of first item different than the first
            // [A, K, A, A, A] returns 1 as index of 'K'
            // [A, A, A, A, K] returns 4 as the index of 'K'
            // [A, A, A, A, K] returns -1 as the condition is not matched
            let count = items.findIndex(symbol => symbol !== item.symbol);
            count = count < 0 ? this.numberOfColumns : count;
            return new Reward_1.Reward(item.symbol, item.winFactor[count - 1], line.slice(0, count));
        }).filter(r => r.multiplier > 0);
    }
}
exports.GameConfiguration = GameConfiguration;
//# sourceMappingURL=GameConfiguration.js.map