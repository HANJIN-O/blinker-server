const model = require("../model");

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      return await model.signup.post(reqBody);
    }
  }
};
