const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (req.method === "GET" && req.url === "/") {
        const data = fs.readFileSync("cms.json", "utf-8");
        res.end(`<p>${data}</p><br><a href='/add'>Dodaj</a>`);
    }

    else if (req.method === "GET" && req.url === "/add") {
        res.end(`
            <form action="/add" method="POST">
                <label>ID</label>
                <input type="text" name="id"><br>
                <label>Name</label>
                <input type="text" name="name"><br>
                <button>Loguj</button>
            </form>
        `);
    }

    else if (req.method === "POST" && req.url === "/add") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const { id, name } = querystring.parse(body);
            const fileData = fs.readFileSync("cms.json", "utf-8");
            const users = fileData ? JSON.parse(fileData) : [];
            users.push({ id, name });
            fs.writeFileSync("cms.json", JSON.stringify(users, null, 2));
            res.end(`item added<br><a href='/'>Back</a>`);
        });
    }

    else if (req.method === "GET" && req.url.startsWith("/data/")) {
        const id = req.url.split("/")[2];
        const data = JSON.parse(fs.readFileSync("cms.json", "utf-8")).find(e => e.id == id);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(data || { error: "Not found" }));
    }

    else {
        res.statusCode = 404;
        res.end("404 - Nie znaleziono strony");
    }
}).listen(3004, () => console.log("Witaj na stronie: http://localhost:3004"));
