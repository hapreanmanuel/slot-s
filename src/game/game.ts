import { GameConfiguration } from "./models/GameConfiguration";
import { Item } from "./models/Item";
import { Reward } from "./models/Reward";
import { RewardScreen } from "./models/RewardScreen";
import { Statistic } from "./models/Statistic";

const Sizzling = new GameConfiguration(
    [
        new Item('J', 6, [0, 0, 4, 10, 40]),
        new Item('Q', 6, [0, 0, 4, 10, 40]),
        new Item('K', 6, [0, 0, 4, 10, 40]),
        new Item('A', 6, [0, 0, 4, 10, 40]),
        new Item('W1', 3, [0, 0, 10, 40, 100]),
        new Item('W2', 3, [0, 0, 10, 40, 100]),
        new Item('*', 1, [0, 0, 2, 10, 50]),
        new Item('7', 1, [0, 0, 20, 200, 1000])
    ],
    5,
    3,
    [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [0, 1, 2, 1, 0],
        [2, 1, 0, 1, 2]
    ]
);

// Return a matrix where first index represents column number and second index represents the row
// Assign each entry a random symbol from the available items on each column
function getRandomScreen(): string[][] {
    return Sizzling.getRandomScreen();
}


export function simulate(size: number): Statistic[] {
    let screen;
    let reward;
    let total = 0;
    const statistics: Statistic[] = [];


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
                statistics.push(new Statistic(
                    wl.symbol,
                    wl.multiplier,
                    1
                ));
            } else {
                existingStatistic.count++;
            }
        });
    }

    // tslint:disable-next-line:no-console
    console.log("Simulated attempts: " + size);
    return statistics;
}
// Each entry represents a column
// Lines are formed across columns based on certain definitions (like neighboring)
// To think how to make this reusable
// TODO refactor
function checkWin(screen: string[][]) {
    return Sizzling.checkWin(screen);
}

export function roll(): RewardScreen {
    const screen = getRandomScreen();

    const reward = checkWin(screen);

    return new RewardScreen(screen[0].map((_, colIndex) => screen.map(row => row[colIndex])), reward);
}