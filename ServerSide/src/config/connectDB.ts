import mongoose from "mongoose";

export const ConnectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("connected to DB");
    }
    catch(err){
        console.log(err);
    }
};