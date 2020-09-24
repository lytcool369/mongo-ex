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

// 조건절
// -> SQL: SELECT * FROM table WHERE column=...;
function testFindByName(name) {
    client.connect().then(client => {
        const db = client.db("mydb");

        db.collection("friends").find({
            name: name
        }).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                console.log(result[i]);
            }
        }).catch(err => {
            console.error(err);
        });
    });
}

// 조건절의 조합 
// -> SQL: SELECT * FROM table WHERE column=(?) and(or) (?);
// 비교 연산자: $gt(>), $gte(>=), $lt(<), $lte(<=), $ne(!=)
function testFindByCondition(condition, projection) {
    client.connect().then(client => {
        const db = client.db("mydb");

        db.collection("friends").find(
            condition,       // 조건
            projection
        ).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].name,
                    result[i].age,
                    result[i].species);
            }
        }).catch(err => {
            console.error(err);
        });
    });
}

// testFindOne();
// testFind();
// testFindByName("고길동");

// projection 객체: 1이면 표시, 0이면 표시 안함
testFindByCondition( 
    {
        // 20세 이상, 50세 이하
        $and: [
            {age: {$gte: 20}},
            {age: {$lte: 50}}
        ]

        // $or: [
        //     {age: {$lt: 20}},
        //     {age: {$gt: 50}}
        // ]
    }, {name: 1, age: 1, species: 1});


