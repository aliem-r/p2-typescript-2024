import { render } from "./render.js";
class Game {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    genre: string;
    developer: string;
    constructor(
        id: number,
        title: string,
        thumbnail: string,
        short_description: string,
        genre: string,
        developer: string
    ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.short_description = short_description;
        this.genre = genre;
        this.developer = developer;
    }
}

//load games from freetogame.com to an array of Game instances
export const loadGames = async (n: number) => {
    const response = await fetch(
        `https://www.freetogame.com/api/games?platform=pc&sort-by=release-date`
    );
    const results: any[] = await response.json();
    const games: Game[] = [];

    for (let i = 0; i < n; i++) {
        const result = results[i];
        const gameInstance = new Game(
            result.id,
            result.title,
            result.thumbnail,
            result.short_description,
            result.genre,
            result.developer
        );
        games.push(gameInstance);
    }

    return games;
};

//render an array of Game instances to HTML
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
