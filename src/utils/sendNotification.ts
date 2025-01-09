import Expo, { ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";



const sendNotification = async({pushToken, title, message}:{pushToken:any, title:string, message:string}) => { 
 
  let expo = new Expo({
    // accessToken: process.env.EXPO_ACCESS_TOKEN,
    /*
     * @deprecated
     * The optional useFcmV1 parameter defaults to true, as FCMv1 is now the default for the Expo push service.
     *
     * If using FCMv1, the useFcmV1 parameter may be omitted.
     * Set this to false to have Expo send to the legacy endpoint.
     *
     * See https://firebase.google.com/support/faq#deprecated-api-shutdown
     * for important information on the legacy endpoint shutdown.
     *
     * Once the legacy service is fully shut down, the parameter will be removed in a future PR.
     */
    useFcmV1: true,
  });
        // Validate the Expo push token
        if (!Expo.isExpoPushToken(pushToken)) {
          console.log('Invalid push token');
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
      
          console.log(tickets)
        } catch (error) {
          console.error('Error sending notification:', error);
          console.log('Internal server error');
        }
      }


export default sendNotification