# Server API Documentation

## Server Link

You can access the server at the following link: [Server Link](https://prisma-practice-psi.vercel.app/)

## API Endpoints

Below are the details of the available API endpoints for creating, reading, updating, and deleting resources.
# User SignUP/Login/Get/Delete

### 1. Create a User

**Endpoint:** `POST /users/sign-up`
**Description:** This endpoint creates a User
**Request:**
- Method: POST
- URL: `http://localhost:3000/users/sign-up`
- Headers:
  - `Content-Type: application/json`
- Body (example):
  json
{"email": "deom2@demo.com",
    "name": "John Doe2",
    "password": "shikhorSoyon" }

### 2. Login To User

**Endpoint:** `POST /users/login`

**Description:** This endpoint Login to the user

**Request:**
- Method: POST
- URL: `http://localhost:3000/users/login`
- Headers:
  - `Content-Type: application/json`
- Body (example):
json
{"email": "deom2@demo.com",
    "password": "shikhorSoyon" }

### 3. Get All User and Single User using JWT token

**Endpoint:** `GET /users/allUser`

**Description:** This endpoint Login to the user

**Request:**
- Method: GET
- URL: `https://prisma-practice-psi.vercel.app/users/allUser`
- URL: `https://prisma-practice-psi.vercel.app/users/:id`

### 4. Delete Single User using JWT token

**Endpoint:** `Delete /users/delete`

**Description:** This endpoint Login to the user

**Request:**
- Method: Delete
- URL: `http://localhost:3000/users/delete`

# Post CRUD
### 1. Create a Post using JWT token

**Endpoint:** `POST /posts`
**Description:** This endpoint creates a User
**Request:**
- Method: POST
- URL: `http://localhost:3000/posts`
- Headers:
  - `Content-Type: multipart/form-data`
- Body (example):
  form-data
{"image": "File",
    "title": "Post Content",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2" }

### 2. Get All User and Single User using JWT token

**Endpoint:** `GET /posts`

**Description:** This endpoint Login to the user

**Request:**
- Method: GET
- URL: `http://localhost:3000/posts`


