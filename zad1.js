const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url.startsWith("/")) {
        const query = url.parse(req.url, true).query;
        const val = query.vegetables ? true : false;
        const path = val ? "warzywa.json" : "owoce.json";
        const data = JSON.parse(fs.readFileSync(path));
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(data));
    }
});

server.listen(3001, () => {
    console.log("Witaj na stronie:http://localhost:3001");
});
