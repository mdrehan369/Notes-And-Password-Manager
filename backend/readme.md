# Guardian Vault API Documentation

## Overview
This documentation provides details for the Guardian Vault API, covering the available endpoints, request parameters, headers, and example requests and responses.

## Base URL
All endpoints are relative to the base URL: http://localhost:3000

## Endpoints

### Users

#### 1. Get Current User
- **Endpoint:** `/api/v1/users`
- **Method:** GET
- **Description:** Fetch details of the current user.


**Example Response:**
```json
{
    "statusCode": 200,
    "data": {
        "_id": "667502fcc5cb535e0e3db20b",
        "username": "mdrehan369",
        "email": "mdrehan4650@gmail.com",
        "name": "MD Rehan",
        "createdAt": "2024-06-21T04:35:08.184Z",
        "updatedAt": "2024-06-21T04:35:08.184Z",
        "__v": 0
    },
    "message": "User fetched successfully",
    "success": true
}
```

#### 2. Signup

-    **Endpoint**: `/api/v1/users/signup`
-    **Method**: POST
-    **Description**: Create a new user.
-    **Request Body**:
```json
{
  "username": "khushee",
  "email": "khushishrivas01@gmail.com",
  "password": "12345678",
  "name": "Khushee"
}
```
- **Request Response**
```json
{
    "statusCode": 201,
    "data": null,
    "message": "User created successfully",
    "success": true
}
```

#### 3. Login

-    **Endpoint**: `/api/v1/users/login`
-    **Method**: POST
-    **Description**: Logs in a user.
-    **Request Body**:
```json
{
  "emailOrusername": "khushee",
  "password": "12345678",
}
```
- **Request Response**
```json
{
{
    "statusCode": 200,
    "data": {
        "_id": "667502fcc5cb535e0e3db20b",
        "username": "mdrehan369",
        "password": "$2a$10$s9txceMcms3fMBosiYv5N.OJXJb6pbknzTFY0HIlK8b/9/fsdtW1.",
        "email": "mdrehan4650@gmail.com",
        "name": "MD Rehan",
        "createdAt": "2024-06-21T04:35:08.184Z",
        "updatedAt": "2024-06-21T04:35:08.184Z",
        "__v": 0
    },
    "message": "User Logged Successfully",
    "success": true
}
}
```
