import { loadGames, renderDetails, renderGames } from "./games.js";
import { render } from "./render.js";
import { serve } from "./serve.js";

// Ruta relativa de la carpeta que sirve los archivos estáticos
export const staticFolder = "./src/public";

// Carga n juegos con loadGames() desde ./games.js
const games = await loadGames(50);

let gameCards: string = "";

// General los HTML
for (const game of games) {
    gameCards += renderGames(game);
    const gameDetails = render(`🎮 ${game.title}`, renderDetails(game), "../");
    await Bun.write(`${staticFolder}/game/${game.id}.html`, gameDetails);
}
const html = render("🎮 free-to-play PC games", gameCards);
await Bun.write(`${staticFolder}/index.html`, html);

// Inicia el servidor en http://localhost:3000/
await serve(staticFolder);

/*

Nota:

Me he dado en el último momento que si le cargas muchas peticiones (más de 4 por segundo) seguidas
a la API te bloquea temporalmente la IP. Eso es porque para sacar los detalles
de los juegos se hace una petición por cada juego con la id.

He pensado en crear un JSON local para guardar los juegos que ya he sacado y que
no haga falta pedirlos de nuevo a la API, así también se podriá evitar generar desde 0
todos los HTML si ya existen. Pero supondría cambiar bastantes cosas y no me daría tiempo
para llegar a la entrega.

Una vez entregado lo trabajaré igualmente para saber cómo se haría.

------------------------

He configurado el package.json para iniciar el servidor con "bun start"

*/
