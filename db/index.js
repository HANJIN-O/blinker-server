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
        .then(res => {
          return res !== null ? res.dataValues.salt : 0;
        })
        .catch(err => {
          console.log(err);
        });

      if (salt !== 0) {
        let hash = bcrypt.hashSync(reqBody.password, salt);
        let cookies = bcrypt.hashSync(
          reqBody.username + reqBody.password,
          salt
        );

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
    }
  },

  // 점수등록 (들어올때에는 username, gamename, score / 포스트할때에는 userId, gameId, score)
  score: {
    post: async function(reqBody) {
      let userId = await sequelize.users
        .findOne({
          where: { username: reqBody.username }
        })
        .then(user => {
          return user.dataValues.id;
        })
        .catch(err => err);
      let gameId = await sequelize.games
        .findOne({
          where: { gamename: reqBody.gamename }
        })
        .then(game => {
          return game.dataValues.id;
        })
        .catch(err => err);

      return await sequelize.scores
        .create({
          gameId: gameId,
          userId: userId,
          score: reqBody.score
        })
        .then(res => {
          let ret = {
            userId: res.userId,
            gameId: res.gameId,
            score: res.score
          };
          return ret;
        })
        .catch(err => err);
    }
  },

  getrank: {
    get: async function() {
      return sequelize.scores
        .findAll({
          attributes: ["score"],
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
          let size = res.length > 10 ? 10 : res.length;
          for (let i = 0; i < size; i++) {
            let username = res[i].dataValues.user.dataValues;
            let gamename = res[i].dataValues.game.dataValues;
            ret.push(
              Object.assign(
                { score: res[i].dataValues.score },
                username,
                gamename
              )
            );
          }
          console.log(ret);
          return ret;
        });
    }
  }
};
