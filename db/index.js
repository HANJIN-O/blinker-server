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
  }
};
