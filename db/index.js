const sequelize = require("./schema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(reqBody.password, salt);
      return sequelize.users
        .count({ where: { username: reqBody.username } })
        .then(count => {
          if (count != 0) return 0;
          else
            return sequelize.users.create({
              username: reqBody.username,
              password: hash,
              salt: salt
            });
        })
        .catch(err => err);
    }
  },

  signin: {
    post: async function(reqBody) {
      let salt = await sequelize.users
        .findOne({
          attributes: ["salt"],
          where: {
            username: reqBody.username
          }
        })
        .then(res => res.dataValues.salt)
        .catch(err => {
          console.log(err);
        });
      let hash = bcrypt.hashSync(reqBody.password, salt);
      let cookies = bcrypt.hashSync(reqBody.username + reqBody.password, salt);

      return sequelize.users
        .findOne({
          where: {
            username: reqBody.username,
            password: hash
          }
        })
        .then(result => [result, reqBody.username, cookies])
        .catch(err => err);
    }
  },

  // 점수등록
  score: {
    post: async function(reqBody) {
      console.log("db index ", reqBody);
      return sequelize.scores.create(reqBody);
    }
  },

  getrank: {
    get: async function(reqBody) {
      return sequelize.scores
        .findAll({
          include: [
            {
              model: sequelize.users,
              as: "user",
              attributes: ["username"]
            },
            {
              model: sequelize.games,
              as: "game",
              attributes: ["gamename"]
            }
          ],
          where: {},
          order: [["score", "desc"]]
        })
        .then(res => {
          let ret = [];
          for (let i = 0; i < res.length; i++) {
            let username = res[i].dataValues.user.dataValues;
            let gamename = res[i].dataValues.game.dataValues;
            let obj = Object.assign(res[i].dataValues);
            delete obj.id;
            delete obj.userId;
            delete obj.gameId;
            delete obj.game;
            delete obj.user;
            delete obj.createdAt;
            delete obj.updatedAt;
            ret.push(Object.assign(obj, username, gamename));
          }
          console.log(ret);
          return ret;
        });
    }
  }
};
