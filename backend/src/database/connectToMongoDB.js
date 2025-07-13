import mongoose from "mongoose";
import processEnvVar from "../utils/processEnvVariable.js";
import { DB_NAME } from "../../constant.js";


const DB_URL = processEnvVar.DB_URL;

// connect to database using mongoose ODM
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log (`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`)
    }catch (error){
        console.log("MONGODB Connection error: ", error);
        process.exit(1)    
    }
}


export default connectDB;