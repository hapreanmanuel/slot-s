"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    // Win factor is array with value multiply factor and index number of identical elements.
    // This combines 'min characters to win' and reward factor concepts
    constructor(symbol, occurrence, winFactor) {
        this.symbol = symbol;
        this.occurrence = occurrence;
        this.winFactor = winFactor;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map