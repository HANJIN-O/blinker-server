# **POST SCORE**

- **URL**

  `/score`

- **Method:**

  POST

- **Response Body**

  Type : JSON

  Structure

  ```
  {
    "username": [string],
    "gamename": [string],
    "score": [integer]
  }
  ```

  as ordered list

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ userId: 1, gameId: 1, score: 14 }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "need userId" }`
