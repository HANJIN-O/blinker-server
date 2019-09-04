const db = require("../db");

module.exports = {
  // 회원가입
  users: {
    // 회원가입
    post: async function(reqBody) {
      return await db.users.post(reqBody);
    }
  }
};
