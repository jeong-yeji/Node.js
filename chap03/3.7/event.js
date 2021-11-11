const EventEmitter = require('events');

const myEvent = new EventEmitter();

// on(), addListener() : 이벤트 이름과 이벤트 발생 시 콜백 연결
myEvent.addListener('event1', () => {
    console.log('이벤트 1');
});
myEvent.on('event2', () => {
    console.log('이벤트 2');
});
myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});
// once() : 한번만 실행되는 이벤트
myEvent.once('event3', () => {
    console.log('이벤트 3');
}); // 한번만 실행됨

// emit() : 이벤트 호출
myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3'); // 실행 안됨

myEvent.on('event4', () => {
    console.log('이벤트 4');
});
// removeAllListeners() : 연결된 모든 이벤트 제거
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안됨

const listener = () => {
    console.log('이벤트 5');
};
myEvent.on('event5', listener);
// removeListener(), off() : 이벤트에 연결된 리스너 하나씩 제거
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안됨

// listenerCount() : 연결된 리스너 개수 확인
console.log(myEvent.listenerCount('event2'));
