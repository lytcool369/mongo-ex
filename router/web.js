// 라우터
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

// 라우터 모듈 내보내기
module.exports = (app) => {
    // 내부 라우트를 처리
    router.get(["/friends/list", "/friends/"], (req, resp) => {
        // friends 컬렉션 list
        let db = app.get("db");

        db.collection("friends").find().toArray().then(result => {
            // EJS 템플릿을 이용하여 렌더링
            resp.render("friends_list", {friends: result});
        }).catch(err => {
            resp.status(500);   // 서버 에러
        })
    });

    // 작성 form 페이지
    router.get("/friends/new", (req, resp) => {
        resp.status(200)
            .render("friends_insert_form");
    });

    // 작성된 form 전송
    router.post("/friends/save", (req, resp) => {
        // POST 에서 전송된 데이터는 req.body 확인
        // console.log("전송된 Body: ", req.body);

        let document = req.body;
        let db = app.get("db");

        db.collection("friends").insertOne(document).then(result => {
            console.log(result);
            resp.redirect("/web/friends/list");     // 강제 URL 변경
        }).catch(err => {
            resp.status(500).send("ERROR: 친구를 추가하지 못했습니다.");
        });
    });

    router.get("/friends/show/:id", (req, resp) => {
        console.log("id: ", req.params.id);
        // _id 필드는 문자열이 아닌, ObjectId 라는 특수 객체 이기 때문에,
        // mongoDB의 ObjectId 를 선언해 도움을 받는다
        let db = app.get("db");

        db.collection("friends").findOne(
            {_id: ObjectId(req.params.id)}
        ).then(result => {
            console.log(result);
            // TODO: 해당 질의에 매칭되는 레코드가 없을 때의 처리
            resp.status(200).render("friend_show", {friend: result});
        }).catch(err => {
            console.error(err);
        });
    });

    return router;
}