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

const getBoundaryData = async () => {
  
 
const backgroundJob = {
  jobKey: "myJob",
  job: async () => {
    const response = await fetch(`${API_URI}`+'/Boundary/find/all',{method: 'GET'})
    const BoundaryData = await response.json()
    console.log(BoundaryData)
    BoundaryData.map((boundary) => {
    boundary.id=toString(boundary.id)
    Boundary.add(boundary)
    .then(() => console.log('success!'))
    .catch((e) => console.log(e));
  })}
  
  };
  let backgroundSchedule = {
    jobKey: "myJob",
   }
  
  BackgroundJob.register(backgroundJob);
  BackgroundJob.schedule(backgroundSchedule)
  .then(() => Boundary.on(Events.ENTER, (id) => {
    LocalNotification()
    }))
  .catch(err => console.err(err));
 }

 getBoundaryData()

 
const Redux = () =>

  <Provider store={store}>
    <App />
  </Provider>

AppRegistry.registerComponent(appName, () => Redux);
