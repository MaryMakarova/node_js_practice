const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const viewsFilePath = path.join(__dirname, 'views.json');

let viewCounts = {};
try {
    const data = fs.readFileSync(viewsFilePath, 'utf-8');
    viewCounts = JSON.parse(data);
} catch {
    viewCounts = { '/': 0, '/about': 0 };
}

function saveViews() {
    fs.writeFileSync(viewsFilePath, JSON.stringify(viewCounts, null, 2));
}


app.get('/', (req, res) => {
    viewCounts['/'] = (viewCounts['/'] || 0) + 1;
    saveViews();


    const filePath = path.join(__dirname, 'public', 'index.html');
    let html = fs.readFileSync(filePath, 'utf-8');
    html = html.replace('Загрузка...', `Количество просмотров: ${viewCounts['/']}`);
    res.send(html);
});

app.get('/about', (req, res) => {
    viewCounts['/about'] = (viewCounts['/about'] || 0) + 1;
    saveViews();

    const filePath = path.join(__dirname, 'public', 'about.html');
    let html = fs.readFileSync(filePath, 'utf-8');
    html = html.replace('Загрузка...', `Количество просмотров: ${viewCounts['/about']}`);
    res.send(html);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 — Страница не найдена</h1><a href="/">На главную</a>');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
