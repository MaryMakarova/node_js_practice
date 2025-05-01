const http = require('http');
const PORT = 3000;
let rootViews = 0;
let aboutViews = 0;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/') {
        rootViews++;
        res.writeHead(200);
        res.end(`
            <h1>Корневая страница</h1>
            <p>Количество просмотров: ${rootViews}</p>
            <a href="/about">Ссылка на страницу about</a>
        `);
    } else if (req.url === '/about') {
        aboutViews++;
        res.writeHead(200);
        res.end(`
            <h1>Страница about</h1>
            <p>Количество просмотров: ${aboutViews}</p>
            <a href="/">Ссылка на корневую страницу</a>
        `);
    } else {
        res.writeHead(404);
        res.end(`
            <h1> 404 — Страница не найдена</h1>
            <a href="/">Ссылка на корневую страницу</a>`
        );
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});