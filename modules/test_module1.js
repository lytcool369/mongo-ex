// exports 객체: 모듈을 다루는 객체
// 현재 모듈에서 객체를 외부로 노출할 수 있다.
// 개별 객체를 내보낼 때 사용하는 방법
exports.add = (num1, num2) => {
    return num1, num2;
}

exports.square = (length) => {
    return length * length;
}