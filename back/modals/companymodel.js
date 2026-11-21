/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import mongoose from "mongoose";

const companySchema = new mongoose.Schema({

    name:{
        type:String
    },
    description:{
        type:String,

    },
    website:{
        type:String,
    

},
location:{
       type:String
   },
   logo:{
       type: String,
 },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

}

},  {timestamps:true});

export default mongoose.model("company",companySchema);