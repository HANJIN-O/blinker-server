# **SIGNIN**

- **URL**

  `/signin`

- **Method:**

  POST

- **Request Body**

  Type : JSON

  Structure

  ```
  {
    "username": [string],
    "password": [string]
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ id : 12 }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "username or password is not correct" }`
