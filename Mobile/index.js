/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import BackgroundJob from 'react-native-background-job';
import Boundary, {Events} from 'react-native-boundary';
import {store,persistedStore } from './src/redux/store';
import { LocalNotification } from './src/services/PushNotificationService';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import {name as appName} from './app.json';
import { API_URI } from './src/utils/constants/Api'
import { Delete_Boundary } from './src/redux/actions';



const getBoundaryData = async () => {
    const response = await fetch(`${API_URI}`+'/Boundary/find/all',{method: 'GET'})
    let storage = store.getState().loginReducer
    if(storage.isLoggedIn){
      const BoundaryData = await response.json()
      await Boundary.off(Events.ENTER)
      console.log(BoundaryData)
      BoundaryData.map((boundary) => {
        boundary.id=boundary.id.toString()
        Boundary.add(boundary)
        .then(() => console.log('success!'))
        .catch((e) => console.log(e));
      })
      Boundary.on(Events.ENTER, id => {
        LocalNotification(id)
        //Delete_Boundary(id)
        })
    }
    else{
      console.log('Not logged In')
    }
   
 }
 const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
     console.log(fcmToken);
  } 

 }

  const backgroundJob = {
    jobKey: "myJob",
    job:  () => getBoundaryData()
    
    };
    let backgroundSchedule = {
      jobKey: "myJob",
      period:2000
     }
    
    BackgroundJob.register(backgroundJob);
    BackgroundJob.schedule(backgroundSchedule)
    .then(() => Boundary.removeAll())
    .catch(err => console.err(err)); 

 
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  
const Redux = () =>

  <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
       <App />
    </PersistGate>
  </Provider>

AppRegistry.registerComponent(appName, () => Redux);
