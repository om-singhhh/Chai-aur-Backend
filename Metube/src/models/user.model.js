import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


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


userSchema.pre("save", async function (next) {
    // there is problem that how many data saved , this function saves or encrypt the passoword
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

//csutom models
userSchema.methods.isPasswordCorrect = async function (password)
{
   return await bcrypt.compare(password,this.password)
}

export const User =  new mongoose.models("User",userSchema)

// direct encryption is not possible so we use bcryptjs to hash the password and for token management we use jwt token and we have to use mongoose hooks