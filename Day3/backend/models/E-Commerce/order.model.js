import mongoose from "mongoose"


// to define the order structure we have to make another structure which is not exporting anywhere ..

const orderItemSchema = new mongoose.Schema({
    productId : {
        types :  mongoose.Schema.Types.ObjectId,
        ref : 'Products'
    },
    quantity :{
        type : Number,
        required : true,
    }
})
const OrderSchema = new mongoose.Schema(
    {
        orderPrice :{
            type : Number,
            required : true,

        },
        customer : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',

        },
        orderItems :{
            type : [orderItemSchema]

        },
        address : {
            type : String,
            required : true,

        },
        status : {
            type : String,
            enum : ["Pending","Cancelled","Delivered"],
            default : "Pending",
        }
    }
    ,{timestamps:true})

export const Order = new mongoose.models("Order",OrderSchema)