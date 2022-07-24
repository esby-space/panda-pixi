# pixi panda!

a small wrapper over [Pixi.JS](https://pixijs.com/), including:
- a basic scene manager
- async / await shared resource loader
- keyboard functionality
- improved shapes and basic collision
- vectors and complex numbers
- simplex noise
- bad spelling :P

## start
with `npm` and `git` installed:
```bash
git clone --depth 1 https://github.com/esby-space/panda.git
cd panda
npm install
npm run dev
```
edit and create to your heart's content!
- `src/main.ts` initializes Panda and Pixi, loads the assets, and runs the scene
- `src/scene.ts` defines the main scene
- `index.html` contains the styling for the webpage

## thanks

- [Pixi.JS](https://pixijs.com/) for ~~breaking my HTML Canvas addiction~~ being the adobe flash in this scary post-2020 world
- Jonas Wagner for the [Javascript Simplex-Noise implementation](https://github.com/jwagner/simplex-noise.js/) (MIT License)
