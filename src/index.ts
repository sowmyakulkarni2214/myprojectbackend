import express from 'express';  // Correct ES Module import
import { SessionData } from 'express-session';
import os from "os"
import connectDatabase from "../src/database/database"
import userRouter from "../src/routes/route"
import StatusTypeModel from './models/statusType/statusTypeModel';
import contentTypeModel from './models/contentManagement/contentTypeModal'
import expressSession from "express-session"
import cors from "cors"
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import NotificationTokenModel from './models/notification/notification';

const app = express();
const port = 8080
app.use(express.json())
console.log("database connection")
connectDatabase()

app.use(
  cors({
    credentials:true,
    origin:["http://192.168.1.16:8081", "http://localhost:3000", "http://localhost:8081"]
    // origin:"*"
  }
))
app.use("/api", userRouter);
declare module 'express-session' {
  interface SessionData {
    token?: string;  // Optional token property (use ? if it's not always present)
  }
}
const expo = new Expo();
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

app.post("/send-notification", async(req:any, res:any) => {
  const { pushToken, user_id } = req.body;
// Validate the Expo push token
if (!Expo.isExpoPushToken(pushToken)) {
  return res.status(400).send('Invalid push token');
}

// Create the push notification message
const messages: ExpoPushMessage[] = [{
  to: pushToken,
  sound: 'default',
  title: "welcome",
  body: "Welcome to the app",
  data: { someData: 'some data' },
}];

try {
  // Split the messages into chunks (Expo allows sending notifications in chunks)
  const chunks = expo.chunkPushNotifications(messages);
  const tickets: ExpoPushTicket[] = [];

  // Send the notifications in chunks
  for (let chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notifications:', error);
    }
  }

  res.status(200).send(tickets);
} catch (error) {
  console.error('Error sending notification:', error);
  res.status(500).send('Internal server error');
}
})

app.post('/api/send-notification', async (req:any, res:any) => {
  const { pushToken, title, message }: any = req.body;

  // Validate the Expo push token
  if (!Expo.isExpoPushToken(pushToken)) {
    return res.status(400).send('Invalid push token');
  }

  // Create the push notification message
  const messages: ExpoPushMessage[] = [{
    to: pushToken,
    sound: 'default',
    title: title,
    body: message,
    data: { someData: 'some data' },
  }];

  try {
    // Split the messages into chunks (Expo allows sending notifications in chunks)
    const chunks = expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    // Send the notifications in chunks
    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending push notifications:', error);
      }
    }

    res.status(200).send(tickets);
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Internal server error');
  }
});


console.log("this is a test", );

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

