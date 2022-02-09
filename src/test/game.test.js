// import { roll } from "../game/game";
const game = require('../game/game');
test("Check Sizzling get random screen", async () => {
    const win = game.roll();

    expect(win.screen.length).toBe(3);
    expect(win.screen[0].length).toBe(5);
  });