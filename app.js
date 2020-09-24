// Express 모듈
const express = require("express");     // 미들웨어
const http = require('http');           // 실제 http 기능을 수행

// Express 객체 생성
const app = express();

// set 메서드: express 내부의 여러 값을 설정(주로 설정)
app.set('port', 3000);      // port 키로 3000을 사용

function startExpress() {
    // 실제 실행은 express 가 아니라 http 모듈이 수행
    http.createServer(app).listen(app.get('port'), () => {
        console.log("Web Server is running on port ", app.get('port'));
    });
}
startExpress();     // 익스프레스 실행