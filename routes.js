// eslint-disable-next-line no-unused-vars
const controller = require("./controller");
const router = require("express").Router();

router.get("/graphql", (req, res) => {
  console.log("hello");
  res.send("hello this is neww app server");
});

module.exports = router;
