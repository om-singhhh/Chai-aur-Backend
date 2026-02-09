import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new mongoose.Schema(
    {
        videofile:{
            type : String, //cloudnary
            required : true,
        },
        thumbnail:{
            type : String, //cloudnary
            required : true,
        },
        title:{
            type : String, 
            required : true,
        },
        description:{
            type : String, 
            required : true,
        },
        duration:{
            type : Number, //cloudnary
            required : true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    },
    {
        timestamps:true,
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const  Video = new mongoose.models("Video",videoSchema)

// we can use monngoose aggreagate pagenite this pipeline makes our project is of advance level
// bcrypt we also use to hash or encrypt the password

// for token management we use jwt token 