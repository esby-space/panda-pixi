import * as Panda from "./lib/panda";

const main = async () => {
    // INIT AND LOAD //

    Panda.App.init({
        width: 480,
        height: 320,
        background: 0x1e1e2e,
        pixel: true,
        resolution: 4,
        padding: 200,
    });

    const assets = [
        { name: "bricks", url: "assets/bricks.png" },
        { name: "bai", url: "assets/bai.png" },
    ];

    await Panda.App.load(assets);

    // MAIN GAME! //
    const scene = (await import("./scene")).Scene;
    Panda.App.changeScene(scene);
};

main();
