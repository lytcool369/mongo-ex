// 외부 모듈 불러오기
const Ticker = require('./modules/ticker');
let seconds = 0;

// Ticker 인스턴스 생성
let ticker = new Ticker(process);

// 이벤트 리스너 부착
process.on('tick', () => {
    // tick 이벤트를 받으면 리스너를 수행(콜백);
    seconds ++;
    console.log(seconds, "초가 지났습니다.");

    if (seconds > 10) {
        ticker.emit('stop');    // ticker 객체에 stop 이벤트 전송
    }
});

ticker.start();     // ticker 구동