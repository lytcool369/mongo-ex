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

    return router;
}