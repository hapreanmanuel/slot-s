import { Item } from "./Item";
import { Reward } from "./Reward";

export class GameConfiguration {
    items: Item[];
    numberOfColumns: number;             // defines length of lines in the screen
    visibleItemsPerColumn: number;       // define number of rows in the screen
    winningLines: number[][];           // define winning lines. consider algorithm for straight and v lines
    columnItems: string[];               // symbol representation of items available in each column
    itemSymbolMap: string[]

    constructor(items: Item[], numberOfColumns: number, visibleItemsPerColumn: number, winningLines: number[][]) {
        this.items = items;
        this.numberOfColumns = numberOfColumns;
        this.visibleItemsPerColumn = visibleItemsPerColumn;
        this.winningLines = winningLines;
        this.columnItems = []
        items.forEach(item => {
            this.columnItems = [...this.columnItems, ...Array(item.occurrence).fill(item.symbol)];;
        });
    }

    private getItemBySymbol(symbol: string): Item {
        return this.items.find(it => it.symbol === symbol);
    }

    getRandomScreen(): string[][] {
        const result: string[][] = [];

        for (let i = 0; i < this.numberOfColumns; i++) {
            result[i] = [];
            const uniqueDigits: Set<number> = new Set();

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

    checkWin(screen: string[][]): Reward[] {

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

            return new Reward(
                item.symbol,
                item.winFactor[count - 1],
                line.slice(0, count)
            );
        }).filter(r => r.multiplier > 0);

    }
}