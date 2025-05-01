const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

app.use(express.json());

function loadUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('Файл users.json не найден. Создаем новый.');
            fs.writeFileSync(usersFilePath, '[]');
            return [];
        } else {
            throw err;
        }
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Получить всех пользователей
app.get('/users', (req, res) => {
    const users = loadUsers();
    res.json(users);
});

// Получить пользователя по ID
app.get('/users/:id', (req, res) => {
    const users = loadUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// Добавить пользователя
app.post('/users', (req, res) => {
    const users = loadUsers();
    const newUser = {
        id: Date.now(),
        name: req.body.name
    };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
});

// Обновить пользователя по ID
app.put('/users/:id', (req, res) => {
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    users[userIndex].name = req.body.name;
    saveUsers(users);
    res.json(users[userIndex]);
});

// Удалить пользователя
app.delete('/users/:id', (req, res) => {
    let users = loadUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const deletedUser = users.splice(userIndex, 1)[0];
    saveUsers(users);
    res.json(deletedUser);
});

app.listen(PORT, () => {
    console.log(`User API is running at http://localhost:${PORT}`);
});
