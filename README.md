
# Image Processing API
## Overview
This project is a NestJS-based API for user authentication and image processing. Users can sign up, log in, and upload images that will be processed and stored in a blob storage service. The API includes JWT-based authentication and authorization.

## Features
+ User signup and login with JWT authentication.
+ Secure image upload using Multer.
+ Image processing and conversion to base64 format.
+ JWT-based authorization for accessing secure endpoints.

## API Endpoints

### Authentication

#### Sign Up

-   **URL**: `POST /api/v1/auth/signup`
-   **Body**:
 
    `{
      "username": "example",
      "password": "password123",
      "tid": "tenant-id",
      "oid": "client-id",
      "aud": "audience",
      "azp": "app-id",
      "name": "names"
    }` 
    
-   **Response**:
    `{
      "username": "example",
      "password": "hashed-password",
      "tid": "tenant-id",
      "oid": "organization-id",
      "aud": "audience",
      "azp": "authorized-party",
      "name": "Example User",
      "_id": "user-id",
      "__v": 0
    }`
#### Log In

-   **URL**: `POST /api/v1/auth/login`
-   **Body**:
    `{
      "username": "example",
      "password": "password123"
    }` 
    
-   **Response**:
    `{
      "JwtToken": "jwt-token"
    }`


### Job

#### Create Job

-   **URL**: `POST /api/v1/job`
-   **Headers**:
    `{
      "Authorization": "Bearer jwt-token"
    }`  
-   **Form Data**:
    -   `image`: The image file to upload.
-   **Response**:
    `{
      "id": "id",
      "token" : "token"
      "image": "base64-image",
      "status": "status"
    }` 
    

#### Get Job Status

-   **URL**: `GET /api/v1/job/:id`
-   **Headers**: 
    `{
      "Authorization": "Bearer jwt-token"
    }` 
    
-   **Response**: 
    `{
      "id": "id",
      "status": "status"
    }`  
    

### Blob

#### Create Blob (Internal Use Only)

-   **URL**: `POST /api/v1/blob`
-   **Headers**:
    `{
      "Authorization": "Bearer jwt-token"
    }` 
-   **Response**:
    `{
      "id": "id",
      "token" : "token"
      "image": "base64-image",
      "status": "status"
    }`  
    
    
#### Get Blob

-   **URL**: `GET /api/v1/blob/:id`
-   **Headers**:
    `{
      "Authorization": "Bearer jwt-token"
    }` 
-   **Response**: 
    `{
      "blobId": "blob-id",
      "token" : "token",
      "image": "base64-image",
      "status" : "status"
    }`
