import { createServer } from "node:http";
import { pathToFileURL } from "node:url";

export const greet = (name) => `Hello, ${name}!`;

export const createVideoDemoServer = () => createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  if (url.pathname !== "/hello") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.end(greet(url.searchParams.get("name")));
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createVideoDemoServer().listen(Number(process.env.PORT ?? 37991));
}
