"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardScreen = void 0;
class RewardScreen {
    constructor(screen, rewards) {
        this.screen = screen;
        this.rewards = rewards;
        this.totalMultiplier = 0;
        rewards.forEach(reward => {
            this.totalMultiplier += reward.multiplier;
        });
    }
}
exports.RewardScreen = RewardScreen;
//# sourceMappingURL=RewardScreen.js.map