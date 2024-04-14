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
    img: Image[];
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
        minimum_requirements: Requirement,
        img: Image[]
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

interface Requirement {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
}

interface Image {
    id: string;
    image: string;
}

// Carga los juegos desde freetogame.com a un array de isntancias de clase Game
export const loadGames = async (n: number) => {
    const response = await fetch(
        `https://www.freetogame.com/api/games?platform=pc&sort-by=release-date`
    );
    const results: any[] = await response.json();
    const games: Game[] = [];

    let validGamesCount = 0;
    let i = 0;
    while (validGamesCount < n) {
        const result = results[i];

        const detailsResponse = await fetch(
            `https://www.freetogame.com/api/game?id=${result.id}`
        );
        const details: any = await detailsResponse.json();

        // Descarta los juegos que tengan algún campo nulo
        if (
            result.id != null &&
            result.title != null &&
            result.thumbnail != null &&
            result.short_description != null &&
            details.description != null &&
            result.game_url != null &&
            result.genre != null &&
            result.developer != null &&
            result.release_date != null &&
            details.minimum_system_requirements.os != null &&
            details.minimum_system_requirements.processor != null &&
            details.minimum_system_requirements.memory != null &&
            details.minimum_system_requirements.graphics != null &&
            details.minimum_system_requirements.storage != null &&
            details.screenshots.length > 2
        ) {
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
            validGamesCount++;
        } else {
            console.log(`invalid game: ${result.id}`);
        }
        i++;
    }

    return games;
};

// Genera las cards de los juegos para añadirlos al index.html
export const renderGames = (game: Game) => {
    return `
        <a class="game-card" href="game/${game.id}.html" data-id="${game.id}">
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
};

// Genera el contenido del detalle para incluirlo al HTML de cada juego
export const renderDetails = (game: Game) => {
    let description = `
    ${game.short_description}<br><br>${game.description.replace(
        /\r\n/g,
        "<br>"
    )}
    `;

    return `
    <article class="game-details" data-id="${game.id}">
        <style>
            .header-container {
                color: var(--white);
            }

            .header-container::before,
            .game-details::before {
                background-image: url("${game.img[0].image}");
            }
        </style>
        <section class="section-1">
            <div class="sticky">
                <img
                    src="${game.thumbnail}"
                    alt="${game.title} Thumbnail"
                />
                <a class="game-url" href="${game.game_url}" target="_blank"></a>
            </div>
        </section>
        <section class="section-2">
            <h1>${game.title}</h1>
            <span class="separator"></span>
            <div class="text">
                <p>
                    ${description}
                </p>
            </div>
            <div class="images">
                <a
                    href="${game.img[1].image}"
                    target="_blank"
                >
                    <img
                        src="${game.img[1].image}"
                        alt="image"
                    />
                </a>
                <a
                    href="${game.img[2].image}"
                    target="_blank"
                >
                    <img
                        src="${game.img[2].image}"
                        alt="image"
                    />
                </a>
            </div>
            <div class="info">
                <h2>Additional Information</h2>
                <table>
                    <tr>
                        <td>Title</td>
                        <td>${game.title}</td>
                    </tr>
                    <tr>
                        <td>Developer</td>
                        <td>${game.developer}</td>
                    </tr>
                    <tr>
                        <td>Release Date</td>
                        <td>${game.release_date}</td>
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td>${game.genre}</td>
                    </tr>
                </table>
            </div>
            <div class="req">
                <h2>Minimum Requirements</h2>
                <table>
                    <tr>
                        <td>OS</td>
                        <td>${game.minimum_requirements.os}</td>
                    </tr>
                    <tr>
                        <td>Processor</td>
                        <td>${game.minimum_requirements.processor}</td>
                    </tr>
                    <tr>
                        <td>Memory</td>
                        <td>${game.minimum_requirements.memory}</td>
                    </tr>
                    <tr>
                        <td>Graphics</td>
                        <td>${game.minimum_requirements.graphics}</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td>${game.minimum_requirements.storage}</td>
                    </tr>
                </table>
            </div>
        </section>
    </article>
    `;
};
