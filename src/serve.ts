export const serve = async (staticFolder: string) => {
    const server = Bun.serve({
        fetch(req) {
            const path = new URL(req.url).pathname;
            if (path === "/") {
                return new Response(Bun.file(`${staticFolder}/index.html`));
            }
            return new Response(Bun.file(`${staticFolder}${path}`));
        },
    });

    console.log(`Listening on http://${server.hostname}:${server.port}/`);
    return await server;
};
