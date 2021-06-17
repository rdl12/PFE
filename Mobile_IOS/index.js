/**
 * @format
 */
 import React from 'react';
import {AppRegistry,
		DeviceEventEmitter,
	 	NativeAppEventEmitter,
	 	Platform,} from 'react-native';


import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import Boundary, {Events} from 'react-native-boundary';
import { LocalNotification } from './src/services/PushNotificationService';
import { API_URI } from './src/utils/constants/Api'
import messaging from '@react-native-firebase/messaging';
import BackgroundTimer from 'react-native-background-timer';
import * as geolib from 'geolib';
import {store,persistedStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Delete_Boundary } from './src/redux/actions';



  

const getBoundaryData = async () => {
  Geolocation.getCurrentPosition(data => {
    lat = data.coords.latitude,
    lng = data.coords.longitude
       console.log(
           'You are ',
           lat,lng,
       );
 }, (error) => alert(error.message),
 { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 }) 
  const response = await fetch(`${API_URI}`+'/Boundary/find/all',{method: 'GET'})
  let storage = store.getState().loginReducer
    if(storage.isLoggedIn && storage.isSecouriste ){

          const BoundaryData = await response.json()
          await Boundary.off(Events.ENTER)
          console.log(BoundaryData)
          BoundaryData.map((boundary) => {

              let distance = geolib.getPreciseDistance( { latitude: lat, longitude: lng },{ latitude: boundary.lat, longitude: boundary.lng })
              if( distance < 100 && distance >10){
                LocalNotification(boundary)
                Delete_Boundary(boundary.id)
                }
            })
    
  }
  else{console.log("not logged in")}
   

 }

const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();

 const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
     console.log(fcmToken);
  } 

 }



// start a global timer
BackgroundTimer.start(); // delay in milliseconds only for Android

BackgroundTimer.runBackgroundTimer(() => { 
//code that will be called every 10 seconds 
getBoundaryData()

}, 
30000);
// stop the timer
//BackgroundTimer.stop();


const Redux = () =>

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
       <App />
    </PersistGate>
  </Provider>

AppRegistry.registerComponent(appName, () => Redux);
