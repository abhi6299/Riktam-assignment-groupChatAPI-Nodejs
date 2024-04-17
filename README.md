# Group Chat Backend API

## Introduction
A simplified Backend API for a robust **Group Chat** facilitating seamless communication and interaction between users. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Screenshots](#screenshots)

## Installation
1. Clone the directory
   ```
   git clone <repo_URL>
   ```
3. Navigate to the project directory
   ```
   cd <Project_directory>
   ```
4. Install Dependencies
   ```markdown
   npm i
   ```

## Usage
1. Start the development server:
```markdown
node index.js
```
2. Open your browser:
```bash
  Open the browser and go to http://localhost:3000 to view the running UI.
```
# Features
Different API have been created with different features which are as follows

## User Management Feature

This feature provides APIs for managing user authentication, authorization, updation of details in the application.

## API Endpoints

1. **Register User**
    - Method: POST
    - Endpoint: `/api/user/register`
    - Description: Route for registering a new user.
    - Screenshot: ![Screenshot (1086)](https://github.com/abhi6299/Riktam-assignment-groupChatAPI-Nodejs/assets/48280843/215087bd-9e65-48e6-b2b8-934d6219def9)

2. **Login User**
    - Method: POST
    - Endpoint: `/api/user/login`
    - Description: Route for logging a user into the application.

3. **Logout User**
    - Method: GET
    - Endpoint: `/api/user/logout`
    - Description: Route for logging out of the application.

4. **Update User Details**
    - Method: POST
    - Endpoint: `/api/user/update`
    - Description: Route to update details of an already registered user.

## Contributing
Kindly create a PR for any contribution or suggestions. Thanks!
