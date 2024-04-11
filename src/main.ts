import { loadGames, renderGames } from "./games.js";
import { serve } from "./serve.js";

const staticFolder = "./src/public";

const games = await loadGames(20);

const html = renderGames(games);
await Bun.write(`${staticFolder}/index.html`, html);

await serve(staticFolder);
