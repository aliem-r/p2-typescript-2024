import { readFile, writeFile } from "fs/promises";
import { loadGames } from "./games.js";
import { renderGames } from "./renderGames.js";

const games = await loadGames(20);

const gamesHtml = renderGames(games);
await writeFile("./src/public/index.html", gamesHtml);
const html = await readFile("./src/public/index.html", "utf8");
