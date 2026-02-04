import mongoose from 'mongoose';

const pateintSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required : true,

        },
        doagnosedWith:{
            // type : mongoose.Schema.Types.ObjectId,
            // ref : 'Doctor',
            type : String,
            required : true,
        },
        address :{
            type : String,
            required : true,

        },
        age :{
            type : Number,
            required : true,

        },
        bloddGroup :{
            type : String,
            enum : ['A+','A-','B+','B-','O+','O-','AB+','AB-','HH'],
            required : true,

        },
        gender : {
            type : String,
            enum : ["Male","Female"],
            required : true,
        },
        admittedIn :{
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'Hospital'

        },
    }
    ,{timestamps:true})

export const Patient = new  mongoose.models('Patient',pateintSchema)
