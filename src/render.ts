export const render = (title: string, body: string, backDir: string = "") => `
<html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="shortcut icon" href="#">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
            rel="stylesheet"
        />
        <link rel="stylesheet" href="${backDir}styles.css" />
    </head>
    <body>
        <header class="container header-container">
            <a href="/"><img src="${backDir}assets/logo-fpcg.png" width="450" /></a>
            <p>
                Discover the best free-to-play games: Explore a World of Endless
                Entertainment!
            </p>
        </header>
        <section class="container cards-container">${body}</section>
        <footer>
            <p>Práctica #02 | Generador de HTML en Typescript</p>
        </footer>
    </body>
</html>
`;
