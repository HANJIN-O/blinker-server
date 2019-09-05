const model = require("../model");

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      return await model.signup.post(reqBody);
    }
  },
  signin: {
    post: async function(reqBody) {
      return await model.signin.post(reqBody);
    }
  }
};
