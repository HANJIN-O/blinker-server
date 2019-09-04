const controller = require("./controller");
const router = require("express").Router();

//회원가입
router.post("/signup", async (req, res) => {
  return await controller.users
    .post(req.body)
    .then(result => {
      console.log(result);
      if (result === 0) throw "already exist!!";
      res.status(200).send("OK");
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send(err);
    });
});

//로그인
router.post("/signin", async (req, res) => {
  return await controller.users
    .post(req.body)
    .then(result => {
      if (result !== 0) res.status(200).send("로그인 되었습니다");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send(err);
    });
});

//점수등록

//랭킹보기

//친구추가

//친구랭킹

module.exports = router;
