// 라우터
const express = require("express");
const router = express.Router();

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

    return router;
}