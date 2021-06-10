import PushNotification from "react-native-push-notification";
import * as Navigation  from './NavigationService';

export const LocalNotification = (data) => {

  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
     // console.log("NOTIFICATION:", notification);
      Navigation.navigate('Home',{id:data})
    
  
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
     
  
    },
  
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    popInitialNotification: true,
    requestPermissions: true,
  });
    
  PushNotification.createChannel(
    {
      channelId: "fcm_fallback_notification_channel", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

   return PushNotification.localNotification({
      autoCancel: true,
      bigText:
        'un arret cardiaque se trouve a votre proximité dans un rayon de 100 m',
      subText: 'entrer pour voir sa position exact',
    /* iOS and Android properties */
      title: "Help", // (optional)
      message: "Arret cardiaque à porximité", // (required)
      vibrate: true,
      //userInfo:data,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      
    })
}