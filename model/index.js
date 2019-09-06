const db = require("../db");

module.exports = {
  // 회원가입
  signup: {
    post: async function(reqBody) {
      return await db.signup.post(reqBody);
    }
  },
  signin: {
    post: async function(reqBody) {
      return await db.signin.post(reqBody);
    }
  },

  // 점수등록
  score: {
    post: async function(reqBody) {
      return await db.score.post(reqBody);
    }
  },

  getrank: {
    get: async function(reqBody) {
      return await db.getrank.get(reqBody);
    }
  }
};
