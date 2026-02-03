import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        description :{
            type : String,
            required : true,
        },
        title : {
            type : String,
            required : true,

        },
        productImage : {
            type : String,
            // cloud nary

        },
        prices :{
            type : Number,
            default : 0,
            required : true,
        },
        stock : {
            type : Number,
            default : 0,
            required : true,
        },
        category :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category',
            required : true

        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }

    },{timestamps:true}
)

export const Product = new mongoose.models("Products",productSchema)


// product iamge is very interesting topic we can keep images in database buffer ex images pdf , it will upload on own server itself , or we use third parties such as aws buckets and clou nary which gives url of the package