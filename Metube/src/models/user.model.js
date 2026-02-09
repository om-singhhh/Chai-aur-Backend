import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required :true,
            unique : true,
            lowercase : true,
            trim:true,
            index:true,

        },
        email : {
            type : String,
            required : true,
             unique : true,
            lowercase : true,
            trim:true,
            index:true,

        },
        fullName :{
            type :String,
            required : true,
            trim:true,
            index:true,
        },
        password :{
            type : String,
            required :[true,'Password is required'],
        },
        avatar : {
            type : String, // cloudnary services we use
            required : true,
            // default : "https://res.cloudinary.com/dzj8q4l9c/image/upload/v1700000000/default-avatar.png"
        },
        coverImage : {
            type : String, // cloudnary services we use 
            required : true,
            // default : "https://res.cloudinary.com/dzj8q4l9c/image/upload/v1700000000/default-cover.jpg"
        },
        watchHistroy : [
            {
                type : mongoose.Schema.Types.ObjectId, 
                ref : "Video",
            }
        ],
        refreshToken:{
            type : String,
        }
    },
    {timestamps:true}
)

export const User =  new mongoose.models("User",userSchema)