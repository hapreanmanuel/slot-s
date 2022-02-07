export class Item {
    symbol:string;
    occurrence:number;
    winFactor:number[];

    // Win factor is array with value multiply factor and index number of identical elements.
    // This combines 'min characters to win' and reward factor concepts
    constructor(symbol: string, occurrence: number, winFactor: number[]) {
        this.symbol = symbol;
        this.occurrence = occurrence;
        this.winFactor = winFactor;
    }
}