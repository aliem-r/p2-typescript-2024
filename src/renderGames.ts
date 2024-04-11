import { Game } from "./games.js";
import { render } from "./render.js";

export const renderGames = (games: Game[]) => {
    let html: string = "";
    for (const game of games) {
        html += `
        <a class="game-card" href="#" data-id="${game.id}">
            <img src="${game.thumbnail}" alt="${game.title} Thumbnail" />
            <section>
                <div class="title">
                    <h2>${game.title}</h2>
                    <span>${game.developer}</span>
                </div>
                <span class="separator"></span>
                <p>${game.short_description}</p>
                <div class="tags">
                    <span class="free-tag">FREE</span>
                    <span class="genre-tag">${game.genre}</span>
                </div>
            </section>
        </a>
        `;
    }
    return render("🎮 free-to-play PC games", html);
};
