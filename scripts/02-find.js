// 클라이언트 생성
const { MongoClient } = require('mongodb');
const url = "mongodb://192.168.1.137/mydb";
const client = new MongoClient(url, { useUnifiedTopology: true });

// 문서 한 개 가져오기
function testFindOne() { 
    client.connect().then(client => {
        const db = client.db("mydb");

        db.collection('friends').findOne().then(result => console.log(result));
    });
}

// db.collection.find()
// -> SQL: SELECT * FROM table
function testFind() {
    client.connect().then(client => {
        const db = client.db("mydb");

        // find는 Promise 를 지원하지 않음
        // db.collection('friends').find((err, cursor) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         cursor.forEach(item => {
        //             console.log(item);
        //         });
        //     }
        // });

        // 데이터가 많지 않을 때는 toArray -> Promise 지원
        db.collection('friends').find()
            .skip(2)              // 2개 건너뛰기
            .limit(2)             // 2개 가져오기
            .sort({ name: 1 })    // 1: 오름차순, -1: 내림차순
            .toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                console.log(result[i]);
            }
        }).catch(err => {
            console.error(err);
        });
    });
}

// testFindOne();
testFind();