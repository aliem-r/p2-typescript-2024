export class Game {
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
