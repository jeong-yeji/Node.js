const http = require('http');
const express = require('express');
const app = express();

const server = http.Server(app);
const io = require('socket.io')(server);
let users = [];

server.listen(8080, () => {
    console.log('8080번 포트에서 서버 실행 중 ..');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    let name = '';

    socket.on('has connected', (username) => {
        name = username;
        users.push(username); // 사용자 추가
        io.emit('has connected', { username: username, usersList: users });
    });

    socket.on('has disconnected', () => {
        users.splice(users.indexOf(name), 1); // 사용자 제거
        io.emit('has disconnected', { username: name, usersList: users });
    });

    socket.on('new message', (data) => {
        // 모든 소켓에 메시지 보냄
        io.emit('new message', data);
    });
});
