const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h1>Strona głowna</h1>
            <a href='/barbarian'>Barbarian</a></br>
            <a href='/druid'>Druid</a></br>
            <a href='/warlock'>Warlock</a></br>
        `);
    } else if (req.url === "/barbarian") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Barbarian</h1>Bijesz ludzi");
    } else if (req.url === "/druid") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Druid</h1>Zmieniasz sie w zwierzeta");
    } else if (req.url === "/warlock") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Warlock</h1>Zawierasz pakt z demonem czy coś");
    } else {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Nie znaleziono strony</h1>");
    }
});

server.listen(3002, () => {
    console.log("Witaj na stronie http://localhost:3002");
});