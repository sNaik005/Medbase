import mongoose from "mongoose";


const userLoginSchema = new mongoose.Schema({
    uniqueId : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    mobile : {
        type : Number
    }
});

const Userlogin = mongoose.model('userlogin', userLoginSchema);

export default Userlogin;