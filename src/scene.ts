import * as PIXI from "pixi.js";
import * as Panda from "./lib/panda";

const style = new PIXI.TextStyle({
    fontFamily: "Verdana",
    fontSize: 21,
    fill: 0xcdd6f4,
    align: "center",
});

const text = new PIXI.Text("Welcome to Pixi Panda!!", style);

export const Scene = {
    ...Panda.App.Scene(),

    init(app: PIXI.Application) {
        text.anchor.set(0.5);
        text.x = app.screen.width / 2;
        text.y = app.screen.height / 2;

        this.container.addChild(text);
    },
};
