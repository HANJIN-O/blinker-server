const controller = require("./controller");
const router = require("express").Router();
const minute = 60 * 1000;
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
  console.log(req.session);
  return await controller.signin
    .post(req.body)
    .then(result => {
      if (result[0] === null)
        throw `{error: username or password is not correct}`;
      res.cookie("blinker", [result[1], result[2]], { maxAge: 100 * minute });
      res.status(200).send("Login Success");
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

//점수등록

//랭킹보기

//친구추가

//친구랭킹

module.exports = router;
