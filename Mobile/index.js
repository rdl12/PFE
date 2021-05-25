/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';


import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';
import BackgroundJob from 'react-native-background-job';
import Boundary, {Events} from 'react-native-boundary';
import { LocalNotification } from './src/services/PushNotificationService';
//import { getBoundaryData } from './src/services/TrackingService'
import { API_URI } from './src/utils/constants/Api'
import messaging from '@react-native-firebase/messaging';

const getBoundaryData = async () => {
  const response = await fetch(`${API_URI}`+'/Boundary/find/all',{method: 'GET'})
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
    })
   

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
    <App />
  </Provider>

AppRegistry.registerComponent(appName, () => Redux);
