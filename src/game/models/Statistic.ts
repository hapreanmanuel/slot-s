export class Statistic {
    symbol: string;
    multiplier: number;
    count: number;

    constructor(symbol: string, multilier: number, count: number) {
        this.symbol = symbol;
        this.multiplier = multilier;
        this.count = count;
    }
}