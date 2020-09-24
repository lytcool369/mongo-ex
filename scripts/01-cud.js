const { MongoClient } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;      <-- 예전 연결 방식

// mongodb의 주소 방식 -> mongodb://{서버IP}:{port}/{DB 이름}

// 클라이언트 생성
const url = "mongodb://192.168.1.137/mydb";
const client = new MongoClient(url, { useUnifiedTopology: true });
// 접속 테스트
function testConnect() {
    client.connect((err, client) => {
        // 콜백 함수
        if (err) {  // 에러 발생 시
            console.error(err);
        } else {    // 정상 접속
            console.log(client);
        }
    });
}
// testConnect();

// insert, insertMany
function testInsertDocument(docs) {
    // docs 가 객체면   -> insert
    // docs 가 배열이면 -> insertMany
    if (Array.isArray(docs)) {
        // db.collection.insert([{문서}, {문서}, {문서}...])
        // -> SQL: INSERT INTO TABLE VALUES(...), (...), (...) ...;
        client.connect().then(client => {
            const db = client.db("mydb");
            db.collection("friends").insertMany(docs)
                .then(result => {
                    console.log(result.insertedCount, "개의 문서가 삽입");
                });
        }).catch(err => {
            console.error(err);
        });
    } else {
        // db.collection.insert({문서});
        // -> SQL: INSERT INTO TABLE VALUES(...);
        client.connect((err, client) => {
            const db = client.db("mydb");
            // collection 객체에 접근
            db.collection("friends").insertOne(docs, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
        });
    }
}

function testDeleteAll() {
    // db.collection.delete()   : 전체 삭제
    // -> SQL: DELETE FROM table;
    client.connect().then(client => {
        const db = client.db("mydb");
        db.collection('friends').deleteMany({})
            .then(result => {
                console.log(result.deletedCount, "개의 문서가 삭제")
            });
    }).catch (err => {
        console.error(err);
    });

}

// Update
// -> SQL: UPDATE table SET col = val, col = val
// db.collection.update( {조건 객체}, {$set: {변경할 내용}})
function testUpdate(condition, doc) {
    client.connect().then(client => {
        const db = client.db("mydb");
        
        db.collection('friends').updateMany(condition, {$set: doc}).then(result => {
            // console.log(result);    // 모든 결과값에서 아래의 정보를 찾아갈 수 있다
            console.log(result.result.nModified, "개의 문서가 업데이트");
        });
    }).catch (err => {
        console.error(err);
    });

}



// testInsertDocument({ name: "전우치", job: "도사" });

// testInsertDocument([
//     {name: "고길동", gender: "남성", species: "인간", age: 50},
//     {name: "둘리", gender: "남성", species: "공룡", age: 100000000},
//     {name: "도우너", gender: "남성", species: "외계인", age: 15},
//     {name: "또치", gender: "여성", species: "조류", age: 13},
//     {name: "마이콜", gender: "남성", species: "인간", age: 25},
//     {name: "봉미선", gender: "여성", species: "인간", age: 35}
// ]);

// testDeleteAll();

testUpdate(
    {name: "마이콜"},   // 조건: name = "고길동"
    {job: "무직"}     // 변경 내용: job = "직장인" -> 추가 혹은 수정
);