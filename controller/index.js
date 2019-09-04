const model = require("../model");

module.exports = {
  // 회원가입
  users: {
    post: async function(reqBody) {
      return await model.users.post(reqBody);
    }
  }
};
