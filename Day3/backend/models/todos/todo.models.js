import mongoose from 'mongoose';

const todoSchema = new mongoose.schema(
    {
        content :{
        type : String,
        required : true,

    },
    complete : {
        type : Boolean,
        default : false,

    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User', //this name is same as we give user model export line...

    },
    subtodos :[
        {
            type: String,
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Subtodo'
        }
        //Array of Subtodos .....
    ]

    },{timestamps:true}
)

export const Todo = mongoose.model("Todo",todoSchema);