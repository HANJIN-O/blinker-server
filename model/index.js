const db = require("../db");

module.exports = {
  // 회원가입
  signup: {
    // 회원가입
    post: async function(reqBody) {
      return await db.signup.post(reqBody);
    }
  }
};
