export class Reward {
    symbol:string;
    multiplier:number;
    line:number[];

    constructor(symbol: string, multilier:number, line: number[]) {
        this.symbol = symbol;
        this.multiplier = multilier;
        this.line = line;
    }
}