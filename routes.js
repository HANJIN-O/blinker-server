// eslint-disable-next-line no-unused-vars
const controller = require("./controller");
const router = require("express").Router();

router.get("/", () => {
  console.log("hello");
});

module.exports = router;
