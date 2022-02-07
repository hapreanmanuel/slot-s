import {Reward} from "./Reward";

export class RewardScreen {
    screen:string[][];
    rewards:Reward[];
    totalMultiplier:number;

    constructor(screen: string[][], rewards:Reward[]) {
        this.screen = screen;
        this.rewards = rewards;
        this.totalMultiplier = 0;
        rewards.forEach(reward => {
            this.totalMultiplier += reward.multiplier;
        });
    }
}