import mongoose from "mongoose";

const URL = "mongodb+srv://narkhededevesh63:Cloudmongo2512@cluster0.1dqjrck.mongodb.net/Medibase";


const Connection = async()=>{
try {
    await mongoose.connect(URL, {useUnifiedTopology : true});
    console.log("Medibase database connected !`")
} catch (error) {
    console.log("locha in mongodb connection : ", error.message);
}
}

export default Connection;