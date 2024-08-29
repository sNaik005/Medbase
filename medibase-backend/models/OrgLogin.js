import mongoose from "mongoose";


const orgLoginSchema = new mongoose.Schema({
    orgId : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    orgName : {
        type : String
    },
    orgType : {
        type : String
    }
});

const Orglogin = mongoose.model('orglogin', orgLoginSchema);

export default Orglogin;