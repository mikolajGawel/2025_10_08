const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        const data = JSON.parse(fs.readFileSync("users.json"));
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(data));
    } 
    else if (req.method === "GET" && req.url === "/add") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <form action="/add" method="POST">
                <label>Username</label>
                <input type="text" name="username"><br>
                <label>Password</label>
                <input type="text" name="password"><br>
                <label>Age</label>
                <input type="text" name="age"><br>
                <button>Loguj</button>
            </form>
        `);
    } 
    else if (req.method === "POST" && req.url === "/add") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const formData = querystring.parse(body);
            const { username, password, age } = formData;

            if (age < 18) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end("Masz problem jesteś niepełnoletni");
                return;
            }

            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!regex.test(password)) {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end("Hasło nie spełnia wymagań minimum 8 znaków, minimum 1 litera i 1 liczba");
                return;
            }

            const fileData = fs.readFileSync("users.json", "utf-8");
            const users = fileData ? JSON.parse(fileData) : [];
            users.push({ username, password, age });

            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end("User added");
        });
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Nie znaleziono strony</h1>");
    }
});

server.listen(3003, () => {
    console.log("Witaj na stronie: http://localhost:3003");
});
