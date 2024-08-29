import mongoose from "mongoose";

const loginStampSchema = new mongoose.Schema({
    ordId : {
        type:String,
        required : true
    },
    personName : {
        type : String,
        required : true
    }
}, { timestamps: { createdAt: 'loginTime' } });

const LoginStamp = mongoose.model('loginstamp', loginStampSchema);

export default LoginStamp;
