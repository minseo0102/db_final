import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,//기본적으로 세가지 정도 설정
}))

router.get('/logout', (req, res) => {//웹페이지에서 req받음
    if (req.cookies.user) {//이미 로그인한 쿠키가 있는지 확인
        res.clearCookie('user')//user라는 쿠키를 초기화->로그인 풀림
        res.redirect("/");//로그인 페이지로 돌아옴
    } else {
        res.redirect("/");
    }
})

module.exports = router;