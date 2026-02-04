import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true,

        },
         salary:{
            type : Number,
            required : true,

        },
         qualification :{
            type : String,
            required : true,

        },
         experienceInYears:{
            type : Number,
            default :0,
            required : true,

        },
         hospitalWorking :{
            // type : String,
            type : mongoose.Schema.Types.ObjectId,
            ref:'Hospital',
            required : true,

        },
    }
    ,{timestamps:true})

export const Doctor = new  mongoose.models('Doctor',doctorSchema)
