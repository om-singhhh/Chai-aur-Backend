# Metube Backend Project - Learning Notes

This project is part of a backend learning series. This documentation covers the theoretical concepts behind the database connection strategy and a detailed code walkthrough.

## 📚 Theoretical Concepts

### 1. Database Connection Strategies

#### The "Database is in Another Continent" Philosophy
When connecting to a database, you must assume it is far away (metaphorically "in another continent"). This means:
*   **Latency exists**: Requests take time.
*   **Failures happen**: The connection might drop or be rejected.
*   **Solution**: Always use **Async/Await** to handle these operations effectively without blocking the main thread.

#### Handling Errors
As noted in the code comments: *"for database connection you have to face errors"*.
Because database operations are unpredictable, we wrap them in:
*   **Try/Catch blocks**: To gracefully handle exceptions.
*   **Promises**: To handle the asynchronous nature of the success/failure states.

#### Approaches to Connection
1.  **Basic Approach (Inline IIFE)**:
    *   *Concept*: Writing the connection logic directly in `index.js` using an IIFE (Immediately Invoked Function Expression).
    *   *Drawback*: As noted, *"it disturbs our code consistency"* and can clutter the main entry file. It works for beginners but isn't scalable.
2.  **Professional Approach (Modular)**:
    *   *Concept*: Create a separate file (`src/db/server.js`) strictly for database logic and import it into the main app.
    *   *Benefit*: Separation of concerns. The main server file remains clean, and the DB logic is reusable.

### 2. Environment Variables (.env)
*   **Consistency**: We use `import dotenv from "dotenv"` instead of `require` to maintain ES Module consistency across the project.
*   **Placement**: `dotenv.config()` must be called as early as possible in the application (at the top of `src/server.js`) so that environment variables are available to all other imports.

---

## 🔍 Code Walkthrough & Explanation

This section explains the core files of the backend logic, updated with the latest implementation.

### 1. Constants (`src/constants.js`)
A simple file to define the database name, ensuring consistency across the project.

```javascript
export const DB_NAME = "metube";
```

### 2. Application Configuration (`src/app.js`)
This file configures the Express application with necessary middlewares.

**Key Theoretical Concepts:**
*   **Express & Middleware**: `app.use()` is used to configure middleware. Middleware functions have access to the request (`req`), response (`res`), and the `next` middleware function in the application’s request-response cycle.
*   **CORS (Cross-Origin Resource Sharing)**: Essential for connecting the frontend to the backend. We configure it to allow requests from our `CORS_ORIGIN` and specifically set `credentials: true` to handle secure cookies.
*   **Data Parsing**:
    *   In older Express versions, we used `body-parser`. Now, Express has built-in middleware.
    *   `express.json({limit: "16kb"})`: Parses incoming JSON requests (e.g., from forms or API calls). We limit the size to avoid server overload.
    *   `express.urlencoded({extended: true})`: Parses data coming from URLs (e.g., search parameters).
*   **Static Assets**: `express.static("public")` serves static files like images or stylesheets.
*   **Cookie Parser**: Used to access and set cookies in the user's browser securely.

```javascript
import express from "express";
import cors from "cors";
import cokkieParser from "cokkie-parser"; // Note: Check your package name here

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cokkieParser())

export { app }
```

### 3. Utilities (`src/utils`)
We created a dedicated `utils` folder to keep our code modular, reusable, and cleaner. This includes standardizing errors and responses.

#### `asyncHandler.js`
A higher-order function that wraps asynchronous route handlers. It avoids the repetitive need for `try-catch` blocks in every controller by automatically passing errors to the `next()` middleware.

```javascript
const asyncHandler = (requestHandler) => {
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    }
}

export {asyncHandler}
```

#### `ApiError.js`
A custom class extending the built-in `Error` class. This ensures that every error sent from our backend has a consistent structure (statusCode, message, success: false, etc.), making it easier for the frontend to handle.

```javascript
class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went Wrong",
        errors =[],
        stack =""
    ){
        super(message)
        this.statusCode=statusCode,
        this.data =null
        this.message = message,
        this.success = false,
        this.errors = errors

        if(stack){
            this.stack = stack

        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}
```

#### `ApiResponse.js`
A standard class for sending successful responses. This guarantees that all success responses form a predictable structure (statusCode, data, message, success: true).

```javascript
class ApiResponse {
    constructor(statusCode,data,message="Success"){
        this.statusCode = statusCode,
        this.data = data,
        this.message =message,
        this.success = statusCode < 400
    }
}
```

### 4. Database Connection (`src/db/server.js`)
This file handles the actual connection to the MongoDB database using Mongoose. It follows a professional approach by isolating the database logic.

```javascript
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`\n MongoDb connected !! DB Host ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("Mongo Db connection error", error);
        process.exit(1)
    }
}

export default connectDB
```

### 4. Server Entry Point (`src/server.js`)
The main entry point triggers the database connection first. Only upon a successful connection does the server start listening.

```javascript
import dotenv from "dotenv";
import connectDB from "./db/server.js";
// Ensure 'app' is imported if you are using it (e.g., import { app } from "./app.js")

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is serving at: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
})
```

---

## 🚀 How to Run

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=8000
    MONGO_URL=your_mongodb_connection_string
    CORS_ORIGIN=*
    ```
4.  **Run the Server**:
    ```bash
    npm run dev
    ```
