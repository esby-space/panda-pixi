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

    // make sure to load assets in before the scene

    // MAIN GAME! //
    const scene = (await import("./scene")).Scene;
    Panda.App.changeScene(scene);
};

main();
