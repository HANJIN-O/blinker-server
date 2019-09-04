const sequelize = require("./schema");

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      console.log(reqBody);
      return sequelize.users
        .count({ where: { username: reqBody.username } })
        .then(count => {
          if (count != 0) return 0;
          else return sequelize.users.create(reqBody);
        });
    }
  },
  signin: {
    post: async function(reqBody) {}
  }
};
