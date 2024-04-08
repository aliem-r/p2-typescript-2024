import { writeFile } from "fs/promises";
import { loadGames } from "./games.js";
import { renderGames } from "./renderGames.js";

const games = await loadGames(20);

const html = renderGames(games);
await writeFile("src/index.html", html);
