import { loadGames, renderDetails, renderGames } from "./games.js";
import { render } from "./render.js";
import { serve } from "./serve.js";

// Ruta relativa de la carpeta que sirve los archivos estáticos
export const staticFolder = "./src/public";

// Carga n juegos con loadGames() desde ./games.js
const games = await loadGames(5);

let gameCards: string = "";

for (const game of games) {
    gameCards += renderGames(game);
    const gameDetails = render(`🎮 ${game.title}`, renderDetails(game), "../");
    await Bun.write(`${staticFolder}/game/${game.id}.html`, gameDetails);
}
const html = render("🎮 free-to-play PC games", gameCards);
await Bun.write(`${staticFolder}/index.html`, html);

await serve(staticFolder);
