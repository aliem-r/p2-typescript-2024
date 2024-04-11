export const serve = (staticFolder: string) => {
    const server = Bun.serve({
        async fetch(req) {
            const path = new URL(req.url).pathname;
            console.log("req.url: ", req.url);
            if (path === "/") {
                return new Response(Bun.file(`${staticFolder}/index.html`));
            }
            return new Response(Bun.file(`${staticFolder}${path}`));
        },
    });

    console.log(`Listening on http://${server.hostname}:${server.port}/`);
    return server;
};
