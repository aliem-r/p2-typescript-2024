import { render } from "./render.js";
class Game {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    description: string;
    game_url: string;
    genre: string;
    developer: string;
    release_date: string;
    minimum_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
    img: string[];
    constructor(
        id: number,
        title: string,
        thumbnail: string,
        short_description: string,
        description: string,
        game_url: string,
        genre: string,
        developer: string,
        release_date: string,
        minimum_requirements: Requirements,
        img: string[]
    ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.short_description = short_description;
        this.description = description;
        this.game_url = game_url;
        this.genre = genre;
        this.developer = developer;
        this.release_date = release_date;
        this.minimum_requirements = minimum_requirements;
        this.img = img;
    }
}

interface Requirements {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
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

        const detailsResponse = await fetch(
            `https://www.freetogame.com/api/game?id=${result.id}`
        );
        const details: any = await detailsResponse.json();
        const gameInstance = new Game(
            result.id,
            result.title,
            result.thumbnail,
            result.short_description,
            details.description,
            result.game_url,
            result.genre,
            result.developer,
            result.release_date,
            details.minimum_system_requirements,
            details.screenshots
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
