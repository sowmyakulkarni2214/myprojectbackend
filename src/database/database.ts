
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"

const envPath = path.resolve(__dirname, '../..', '.env');
dotenv.config({ path: envPath });


let MongodbURL = process.env.MONGODB_URL


const connectDatabase = async () => {
    try {
        if (MongodbURL) {
            await mongoose.connect(MongodbURL)          
            console.log("Mongodb connected");
           
        }
    } catch (error) {       
        console.log("Mongodb Not-connected");
    }
}

export default connectDatabase;