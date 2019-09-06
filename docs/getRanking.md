# **GET RANKING**

- **URL**

  `/getrank`

- **Method:**

  GET

- **Response Body**

  Type : JSON

  Structure

  ```
  {
    "score": [integer],
    "username": [string],
    "gamename": [string]
  }
  ```

  as ordered list

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `Response Body`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "unexpected error" }`
