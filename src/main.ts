import { loadGames, renderGames } from "./games.js";
import { serve } from "./serve.js"; // para servir la carpeta ./public con Bun start.

const staticFolder = "./src/public";

const games = await loadGames(5);

const html = renderGames(games);
await Bun.write(`${staticFolder}/index.html`, html);

await serve(staticFolder);
