const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, { path: '/socket.io' }); // path는 index.html과 동일하게 지정

    io.on('connection', (socket) => {
        const req = socket.request;
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`New Client : ${ip}, socket.id : ${socket.id}`);
        // socket.id : 각 소켓에 부여하는 고유한 ID
        // 이를 이용해 특정 사용자에게만 메세지 보내는 기능 만들 수 있음

        socket.on('error', (error) => {});

        socket.on('from client', (data) => {
            // 클라이언트가 넘긴 데이터
            console.log(data);
        });

        socket.interval = setInterval(() => {
            // send 대신 emit으로 메시지를 보냄
            socket.emit('from server', 'Message From Server');
            // io.emit() : 연결된 모든 소켓에 이벤트 보냄
            // socket.emit() : 특정 소켓에만 이벤트 보냄
        }, 3000);
    });
};
