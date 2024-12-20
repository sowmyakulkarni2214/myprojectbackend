import express from 'express';  // Correct ES Module import
import { SessionData } from 'express-session';
import os from "os"
import connectDatabase from "../src/database/database"
import userRouter from "../src/routes/route"
import StatusTypeModel from './models/statusType/statusTypeModel';
import contentTypeModel from './models/contentManagement/contentTypeModal'
import expressSession from "express-session"
import cors from "cors"

const app = express();
const port = 8080
app.use(express.json())
console.log("database connection")
connectDatabase()

app.use(
  cors({
    credentials:true,
    origin:["http://192.168.1.21:8081", "http://localhost:3000", "http://localhost:8081"]
    // origin:"*"
  }
))
app.use("/api", userRouter);
declare module 'express-session' {
  interface SessionData {
    token?: string;  // Optional token property (use ? if it's not always present)
  }
}
// app.use('/api', userRouter)
  app.get("/api/config/statustype", async (req, res) => {
    await StatusTypeModel.deleteMany({});
    await StatusTypeModel.create({ status_type: "USER ACTIVE", status_type_id: 1 });
    await StatusTypeModel.create({ status_type: "USER IN-ACTIVE", status_type_id: -1 });  
    await StatusTypeModel.create({ status_type: "CONTENT ACTIVE", status_type_id: 9 });
    await StatusTypeModel.create({ status_type: "CONTENT IN-ACTIVE", status_type_id: 10 });
    await StatusTypeModel.create({ status_type: "CONTENT POINT ACTIVE", status_type_id: 11 });
    await StatusTypeModel.create({ status_type: "CONTENT POINT IN-ACTIVE", status_type_id: 12 });
    await StatusTypeModel.create({ status_type: "CONTENT TYPE ACTIVE", status_type_id: 20 });
    await StatusTypeModel.create({ status_type: "CONTENT TYPE IN-ACTIVE", status_type_id: 21 });
    res.send("Status Types Configured");
  });
    

  app.get("/api/config/contenttype", async (req, res) => {
    await contentTypeModel.deleteMany({});
    await contentTypeModel.create({ type: "PRIVACY POLICY", type_id: 1 });
    await contentTypeModel.create({ type: "TERMS AND CONDITIONS", type_id: 2 });
    await contentTypeModel.create({ type: "HELP AND SUPPORT", type_id: 3 });
    await contentTypeModel.create({ type: "ABOUT MY BANKIING AI", type_id: 4 });  
    res.send("Content Types Configured");
  });
  
// })
// .catch(err => {
//     console.error("Database connection error:", err);
// });
 
declare module 'express' {
  export interface Request {
    //  user?: User;  You can replace `any` with a more specific type if available
    user?: any; // You can replace `any` with a more specific type if available
  }
}


console.log("this is a test", );

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

