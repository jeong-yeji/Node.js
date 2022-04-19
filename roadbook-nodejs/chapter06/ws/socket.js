const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        // 사용자 IP 알아내기
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('New Client : ', ip);

        // 클라이언트로부터 받은 메시지
        ws.on('message', (message) => {
            console.log(message.toString('utf-8'));
        });

        // 오류 처리
        ws.on('error', (err) => {
            console.error(err);
        });

        // 종료
        ws.on('close', () => {
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        // 3초마다 서버에서 클라이언트에 메시지 전송
        ws.interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.send('Message From Server.');
            }
        }, 3000);
    });
};
