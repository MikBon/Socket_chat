const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Налаштування сервера
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Роздача статичних файлів
app.use(express.static('public'));

// Обробка з'єднань WebSocket
io.on('connection', (socket) => {
    console.log('A user connected');

    // Відправлення повідомлення від клієнта всім іншим
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Відключення користувача
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
