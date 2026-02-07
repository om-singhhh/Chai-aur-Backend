// require('dotenv').config(); 
// but it disturbs our code consistency

import dotenv from "dotenv";
import connectDB from "./db/server.js"


dotenv.config({
    path : './.env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is serving at: ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log("MongoDB connection failed",error);

})

/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();

 it is a basic approach for beginners where we use mongoose.connect() inside a function and call that function to connect to the database. However, this approach can lead to issues if there are errors during the connection process, as it may not properly handle exceptions or provide feedback on the connection status.

;(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR:",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log("ERROR:",error)
        throw error
    }
})()
    */

//for database connection you have to face eroors
// use try catch or use promises 
// database is always in another continent async await use kro 


// function connectDB(){}

// connectDB()

// there is better approach instead of using this
// use ife