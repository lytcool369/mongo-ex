// 외부 모듈에서 객체 받아오기: reqiure

/*  옛날 방식
const add = require('./modules/test_module1').add;
const squre = require('./modules/test_module1').square;
*/

// 현재 방식
const {add, square} = require('./modules/test_module1');
console.log("add: ", add(10, 20));
console.log("square: ", square(20));

const area = require('./modules/test_module2');     // 모듈 전체 불러오기
console.log(area.square(20));
console.log(area.circle(10));