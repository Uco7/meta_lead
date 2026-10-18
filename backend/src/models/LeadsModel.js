import mongoose from "mongoose"
const leadsSchema=new mongoose.Schema({
    metaLead_id:{
        type:String,
        required:true,
        unique:true
    },
    page_id:{
        type:String,
        required:true
    },
    form_id:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    createdTime:{
        type:Date
    }
},
{timestamps:true}
)
export default mongoose.model('Leads',leadsSchema)