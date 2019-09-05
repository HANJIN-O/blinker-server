const express = require("express");
const cors = require("cors");
const router = require("./routes.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "eencryption"
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.listen(5000, () => {
  console.log("Listen on 5000");
});
