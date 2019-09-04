const controller = require("./controller");
const router = require("express").Router();

//회원가입
router.post("/signup", async (req, res) => {
  return await controller.signup
    .post(req.body)
    .then(result => {
      if (result === 0) throw "{error: Already Exist}";
      res.status(200).send(`{id: ${result.dataValues.id}}`);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send(err);
    });
});

//로그인
router.post("/signin", async (req, res) => {
  return await controller.signin
    .post(req.body)
    .then(result => {
      if (result !== 0) throw `{error: username or password is not correct}`;
      res.status(200).send("로그인 되었습니다");
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
