# **GET RANKING**

- **URL**

  `/rank/home`

- **Method:**

  GET

- **Response Body**

  Type : JSON

  Structure

  ```
  {
    "username": [string],
    "score": [integer]
  }
  ```

  as ordered list

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `Response Body`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "need Gamename" }`
