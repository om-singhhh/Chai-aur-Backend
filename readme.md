# Node.js & Express.js – Learning Notes

This README documents the core concepts I learned while getting started with **Node.js** and **Express.js**, focusing on API creation, request handling, and deployment best practices.

---

## Index of Learning

- [Node.js Setup](#nodejs-setup)
- [Installing Express.js](#installing-expressjs)
- [Basic File Structure](#basic-file-structure)
- [Creating an Express Server](#creating-an-express-server)
- [Handling Requests and Responses](#handling-requests-and-responses)
- [API Responses Using res.json()](#api-responses-using-resjson)
- [Using Nodemon](#using-nodemon)
- [Environment Variables with dotenv](#environment-variables-with-dotenv)
- [Production Deployment Considerations](#production-deployment-considerations)
- [Conclusion](#conclusion)
- [Day 2: Full Stack Integration](#day-2-full-stack-integration-backend--frontend)
  - [Module Systems: CommonJS vs ES Modules](#1-module-systems-commonjs-vs-es-modules)
  - [Creating the Jokes API](#2-creating-the-jokes-api)
  - [Connecting Frontend with Backend](#3-connecting-frontend-with-backend)
  - [Using a Proxy in Vite](#4-using-a-proxy-in-vite-development)
  - [Frontend Common Mistakes](#5-frontend-common-mistakes)
  - [Summary](#6-summary)
- [Day 3: Data Modeling with Mongoose](#day-3-data-modeling-with-mongoose)
  - [Mongoose & Schemas](#1-mongoose--schemas)
  - [Key Concepts in Data Modeling](#2-key-concepts-in-data-modeling)
  - [Handling Relationships](#3-handling-relationships)

---

## Node.js Setup

Node.js allows JavaScript to run on the server side.

### Steps I followed:

1. Installed Node.js
2. Verified installation:

   ```bash
   node -v
   npm -v
   ```
3. Initialized the project:

   ```bash
   npm init -y
   ```

This generated the `package.json` file to manage dependencies and scripts.

---

## Installing Express.js

Express.js is a lightweight Node.js framework used to build APIs and backend services.

```bash
npm install express
```

Express simplifies:

* Routing
* Middleware usage
* Request and response handling

---

## Basic File Structure

I followed a clean and minimal file structure:

```
project-root/
│
├── node_modules/
├── index.js
├── package.json
├── package-lock.json
└── .env
```

* `index.js` is the entry point
* `.env` stores environment variables
* `node_modules` contains installed dependencies

---

## Creating an Express Server

I created a basic Express server that listens on port `3000`.

```js
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## Handling Requests and Responses

Express provides two main objects:

* `req` (request)
* `res` (response)

### Example: GET request

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```

Supported request types include:

* GET
* POST
* PUT
* DELETE

---

## API Responses Using res.json()

I used `res.json()` to send structured API responses.

```js
app.get("/api/data", (req, res) => {
  res.json({
    success: true,
    message: "API working successfully"
  });
});
```

This is useful for frontend integration and API development.

---

## Using Nodemon

Nodemon automatically restarts the server on file changes during development.

### Installation:

```bash
npm install nodemon --save-dev
```

### Usage:

```bash
npx nodemon index.js
```

### Why I used Nodemon:

* Eliminates manual restarts
* Speeds up development
* Improves workflow efficiency

---

## Environment Variables with dotenv

To protect sensitive data, I used environment variables.

### Installation:

```bash
npm install dotenv
```

### Setup:

```js
require("dotenv").config();
const PORT = process.env.PORT;
```

Sensitive information like API keys and database credentials are not hardcoded.

---

## Production Deployment Considerations

Before deploying the application, I ensured:

* `.env` file is not uploaded
* Sensitive data is excluded using `.gitignore`
* Inputs are validated
* Errors are handled properly
* Environment-specific configurations are used

These steps help maintain security and reliability in production.

---

## Conclusion

* Node.js enables backend development using JavaScript
* Express.js simplifies API creation
* Nodemon improves development speed
* dotenv protects sensitive configuration
* `res.json()` is essential for API responses
* Proper structure and security practices are crucial for deployment

---

This README serves as a reference for my backend learning progress and future revisions.




---

## Day 2: Full Stack Integration (Backend + Frontend)

This section covers connecting a React frontend (Vite) with an Express backend, handling CORS errors, and using Proxies.

### 1. Module Systems: CommonJS vs ES Modules

Node.js uses CommonJS by default, but we can switch to ES Modules.

**CommonJS (Default):**
```javascript
const express = require('express');
```

**ES Module (Modern):**
To use this, add `"type": "module"` in `package.json`.
```javascript
import express from 'express';
```

### 2. Creating the Jokes API

We created a simple server with a standard API route structure.

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Standard practice: Use /api/v1/ or /api/ for API routes
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'A joke',
            content: 'This is a joke'
        },
        {
            id: 2,
            title: 'Another joke',
            content: 'This is another joke'
        },
        {
            id: 3,
            title: 'A third joke',
            content: 'This is a third joke'
        },
    ];
    // Use JSON Formatter extension to view this data clearly in browser
    res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is serving at http://localhost:${port}`);
});
```

### 3. Connecting Frontend with Backend

When trying to fetch this API from a frontend (running on a different port like 5173), we face **CORS (Cross-Origin Resource Sharing)** errors.

**Error:** `Access to fetch at 'http://localhost:3000/api/jokes' from origin 'http://localhost:5173' has been blocked by CORS policy.`

**Why?**
Browsers enforce security to prevent malicious websites from accessing resources on another domain without permission.

**Solutions:**
1.  **Whitelist Domains:** Allow specific origins in the backend (using `cors` package).
2.  **Proxy Server:** Forward requests through the frontend server (Development).

### 4. Using a Proxy in Vite (Development)

To solve CORS locally without changing backend code, we use a proxy in `vite.config.js`. This creates a tunnel so the browser thinks the request is coming from the same origin.

**In `vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Forward requests starting with /api to backend
    },
  },
  plugins: [react()],
})
```

**How it works:**
- Frontend requests `/api/jokes` (relative path).
- Vite server receives it and forwards it to `http://localhost:3000/api/jokes`.
- The browser sees it as a same-origin request, bypassing CORS.

### 5. Frontend Common Mistakes

When fetching data in React:

1.  **Missing Dependency Array in `useEffect`:**
    -   Without `[]`, `useEffect` runs on every render, causing an infinite loop of requests.
    ```javascript
    useEffect(() => {
        // fetch data
    }, []); // <-- Important!
    ```

2.  **Missing Return in `map`:**
    -   If using `{}` brackets in `map`, you must explicitly `return` the JSX.
    ```javascript
    // Incorrect (returns undefined)
    jokes.map((joke) => { <h1>{joke.title}</h1> }) 
    
    // Correct (Implicit return)
    jokes.map((joke) => ( 
        <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
        </div>
    ))
    ```

### 6. Summary

-   **Backend:** Created a simple API with Express.
-   **Structure:** Used `/api/jokes` for cleaner URL handling.
-   **CORS:** Understood why it happens and how to solve it.
-   **Proxy:** Configured Vite proxy to handle cross-origin requests during development.
 
 # Day 3: Data Modeling with Mongoose

This section focuses on defining the structure of our data using Mongoose models. We covered creating Schemas, handling relationships between models, and using standard data validation.

## 1. Mongoose & Schemas

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

### Defining a Schema
A Schema maps to a MongoDB collection and defines the shape of the documents within that collection.

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"] // Custom error message
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields
```

## 2. Key Concepts in Data Modeling

### Validation
Mongoose provides built-in validators:
- `required`: Ensures the field is present.
- `unique`: Ensures the value is unique in the collection.
- `min`/`max`: For numbers.
- `enum`: Limits the value to a specific set of strings.

### Timestamps
Passing `{ timestamps: true }` as the second argument to the Schema constructor automatically adds `createdAt` and `updatedAt` properties to the document.

### Exporting Models
It is standard practice to export the model based on the schema.
```javascript
export const User = mongoose.model("User", userSchema);
```
> **Note:** The string "User" will be automatically pluralized and lowercased by Mongoose to look for the "users" collection in the database.

## 3. Handling Relationships

To link documents (like a Todo belonging to a User), we use `mongoose.Schema.Types.ObjectId` and the `ref` property.

### Example: Todo Model with User Reference
```javascript
const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // Must match the model name exported in User model
    },
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"
        }
    ]
}, { timestamps: true });
```

This allows us to use `.populate()` later to automatically replace the `createdBy` ID with the actual User document.
