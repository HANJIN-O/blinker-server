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

// 로그인
router.post("/signin", async (req, res) => {
  console.log(req.cookies);
  return await controller.signin
    .post(req.body)
    .then(result => {
      if (result[0] === null)
        throw `{error: username or password is not correct}`;
      res.cookie("username", result[1], { maxAge: 100 * minute });
      res.status(200).send("Login Success");
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

// 점수등록 ( gamename, username, score )
router.post("/score", async (req, res) => {
  return await controller.score
    .post(req.body)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send(err);
    });
});

// 랭킹보기
router.get("/getrank", async (req, res) => {
  return await controller.getrank
    .get(req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
      res.send(err);
    });
});

// 친구추가

// 친구랭킹

module.exports = router;
