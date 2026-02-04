import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
    {
        patientName :{
            type : String,
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Patient',
            required : true,

        },
        age :{
            type : Number,
            required : true,

        },
        gender :{
            type : String,
            required : true,

        },
        diagnosis :{
            type : String,
            required : true,

        },
        treatmentDetails :{
            type : String,
            required : true,

        },
        
    }
    ,{timestamps:true})
export const Records = new  mongoose.models('Medical_Record',recordSchema)