import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        // console.log("Connecting to MongoDB...");
        // Debugging: Check if environment variables are loaded
        // console.log("MONGO_URL:", process.env.MONGO_URL);

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        
        console.log(`\n MongoDb connected !! DB Host ${connectionInstance.connection.host}`);
        // console.log("Connection Instance:", connectionInstance); 
        // Log the full instance as per assignment
    }
    catch(error){
        console.log("Mongo Db connection error",error);
        process.exit(1)
    }
}

export default connectDB

// Assignment 1 try to run this and console log this connection instance


// connectionInstance.connection.host we use this because we want to know on which database we are connected