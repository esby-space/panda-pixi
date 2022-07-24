import * as Panda from "./lib/panda";

const main = async () => {
    // INIT AND LOAD //

    Panda.App.init({ width: 480, height: 320, background: 0x87ceeb, pixel: true, resolution: 4 });

    const assets = [
        { name: "bricks", url: "assets/bricks.png" },
        { name: "bai", url: "assets/bai.png" },
    ];

    await Panda.App.load(assets);

    // MAIN GAME! //
    const game = await import("./game");
    Panda.App.changeScene(game.Scene);
};

main();
