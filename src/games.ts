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

export const loadGames = async () => {
    const response = await fetch(
        `https://www.freetogame.com/api/games?platform=pc&sort-by=release-date`
    );
    const results: any[] = await response.json();
    const games: Game[] = [];
    const furstClass: Game = new Game(
        123,
        "Game Title",
        "thumbnail.jpg",
        "Lorem ipsum dolor sit amet",
        "Shooter",
        "Game Dev Studio"
    );
    return furstClass;
};

loadGames();
