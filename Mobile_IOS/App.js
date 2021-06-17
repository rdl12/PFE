import { View,Text ,Alert} from 'react-native'
import Providers from './src/Navigation';
import React,{ useEffect } from 'react';
//import messaging from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);


  return <Providers />;
}

export default App;
