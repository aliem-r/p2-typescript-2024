import { writeFile } from "fs/promises";
import { loadGames } from "./games.js";

console.log(await loadGames());
