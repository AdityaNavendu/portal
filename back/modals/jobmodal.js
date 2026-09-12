import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:[String],
        required:true
    },
    location:{
        type:String,
        required:true
     },
    salary:{
        type:Number,
        required:true
    },
    
      jobtype:{
        type:String,
        required:true,
        enum:["fulltime","parttime"],
        default:"fulltime",
        required:true
    },
experience:{
            type:Number
        },
      company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true
    },
    position:{
        type:String,
        ref:"Position",
        required:true
    },
     created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     applicants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            default:null
        }
     ]
},  {timestamps:true});

export default mongoose.model("Job",jobSchema);