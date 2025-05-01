const express = require('express');
const PORT = 3000;
let viewCounts = {};

const fs = require('fs');
const path = require('path');
const app = express();

const viewsFilePath = path.join(__dirname, 'views.json');

try {
    const data = fs.readFileSync(viewsFilePath, 'utf-8');
    viewCounts = JSON.parse(data);
} catch (err) {
    console.log('Файл views.json создан');
    viewCounts = { '/': 0, '/about': 0 };
}

function saveViews() {
    fs.writeFileSync(viewsFilePath, JSON.stringify(viewCounts, null, 2));
}

app.get('/', (req, res) => {
    viewCounts['/'] = (viewCounts['/'] || 0) + 1;
    saveViews();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`
        <h1>Корневая страница</h1>
        <p>Количество просмотров: ${viewCounts['/']}</p>
        <a href="/about">Ссылка на страницу about</a>
  `);
});


app.get('/about', (req, res) => {
    viewCounts['/about'] = (viewCounts['/about'] || 0) + 1;
    saveViews();

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`
        <h1>Страница about</h1>
        <p>Количество просмотров: ${viewCounts['/about']}</p>
        <a href="/">Ссылка на корневую страницу</a>
  `);
});


app.use((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(`
        <h1>404 — Страница не найдена</h1>
        <a href="/">Ссылка на корневую страницу</a>
  `);
});


app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
