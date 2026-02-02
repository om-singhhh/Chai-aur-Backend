import mongoose from "mongoose";   

const userSchema = new mongoose.Schema(
    {
        // here we can define the structure of the document
        // here we define objects which we want to store in the document
        // username : String, 
        // email : String,
        // isActive : Boolean

        username : {
            type : String,
            required : true,
            unique : true,
        },
        email : {
            type: String,
            required : true,
            unique : true,

        },
        password : {
            type : String,
            required : [true,"Password is required"],
        },
        
    },
    {
        timestamps : true
    }
)

export const User = mongoose.model("User", userSchema);

