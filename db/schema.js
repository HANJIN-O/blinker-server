const sequelize = {};
const Sequelize = require("sequelize");
const db = new Sequelize("blinker", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  port: 13306
});

const Users = db.define("users", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
  },
  updatedAt: {
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
  }
});

const Scores = db.define("scores", {
  score: Sequelize.INTEGER,
  createdAt: {
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
  },
  updatedAt: {
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
  }
});

const Games = db.define("games", {
  gamename: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
  },
  updatedAt: {
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
  }
});

Scores.belongsTo(Users, { as: "user" });
Scores.belongsTo(Games, { as: "game" });

Users.sync({ alter: true })
  .then(() => Games.sync({ alter: true }))
  .then(() => Scores.sync({ alter: true }))
  .then(() => console.log("done!!!!!!!!!!!"));

sequelize.scores = Scores;
sequelize.users = Users;
sequelize.games = Games;

module.exports = sequelize;
