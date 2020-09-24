// 모듈 객체 전체를 내보내기

const area = {
    square: (length) => {
        return length * length;
    },
    circle: (radius) => {
        return radius ** 2 * Math.PI;
    }
}

module.exports = area;