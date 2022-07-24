import { Application, Container, IAddOptions, Loader, settings, SCALE_MODES } from "pixi.js";

export type Scene = {
    hasRun: boolean;
    container: Container;

    load?(): Promise<void>;
    init?(app: Application): void;
    update?(dt: number): void;
    start?(): void;
    stop?(): void;

    [key: string]: unknown;
};

const App = {
    app: null as Application | null,
    current: null as Scene | null,

    /** Initializes a Pixi.js application and handles resizing */
    init({
        width = window.innerWidth,
        height = window.innerHeight,
        background = 0x000000,
        container = document.body,
        pixel = false,
        resolution = window.devicePixelRatio,
        padding = 0,
    } = {}): void {
        this.app = new Application({
            width,
            height,
            backgroundColor: background,
            resolution,
            autoDensity: true,
        });
        container.append(this.app.view);

        if (pixel) settings.SCALE_MODE = SCALE_MODES.NEAREST;

        // handle resize
        this.resize(padding);
        window.addEventListener("resize", () => this.resize(padding));
    },

    resize(padding: number) {
        if (!this.app) throw new Error("please run `App.init() first x_x`");

        const scale = Math.min(window.innerWidth / this.app.view.width, window.innerHeight / this.app.view.height);
        this.app.view.style.width = `${scale * this.app.view.width - padding}px`;
        this.app.view.style.height = `${scale * this.app.view.height - padding}px`;
    },

    /** Change scene, runs `Scene.init()` if it's the first time the scene is shown, runs `Scene.start()` every time it is shown. */
    async changeScene(scene: Scene) {
        if (!this.app) throw new Error("please run `App.init()` first x_x");

        if (this.current) {
            if (this.current.stop) this.current.stop();
            if (this.current.update) this.app.ticker.remove(this.current.update, this.current);
            this.app.stage.removeChild(this.current.container);
        }

        this.current = scene;
        if (!scene.hasRun && scene.init) {
            if (scene.load) await scene.load();
            scene.init(this.app);
            scene.hasRun = true;
        }

        if (scene.start) scene.start();
        if (scene.update) this.app.ticker.add(scene.update, scene);
        this.app.stage.addChild(scene.container);
    },

    /** Mixin to easily create a new scene. Usage: `const MyScene = { ...App.Scene(), init(app) { / my code / } }` */
    Scene(): Scene {
        return {
            hasRun: false,
            container: new Container(),
        };
    },

    /** Load assets to the shared PIXI loader. Usage: `await App.load([{ name: "sprite", url: "sprite.png" }])` */
    async load(assets: (string | IAddOptions)[]): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            Loader.shared.add(assets);
            Loader.shared.load();
            Loader.shared.onComplete.add(() => resolve());
            Loader.shared.onError.add(() => reject());
        });
    },
};

export { App };
