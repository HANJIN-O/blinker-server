# **SIGNUP**

- **URL**

  `/signup`

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
    **Content:** `{ id : ${id} }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Already Exist" }`
