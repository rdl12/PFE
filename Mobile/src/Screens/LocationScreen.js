import React,  {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Boundary, {Events} from 'react-native-boundary';
import useBackgroundGeolocationTracker from '../components/BgTracking';
import PushNotification from "react-native-push-notification";
import Geolocation from '@react-native-community/geolocation';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const LocationScreen = () => {

  const [latitude, setlat] = useState();
  const [longitude, setlong] = useState();


  const [Enter, setEnter] = useState(false);
  const location = useBackgroundGeolocationTracker();
  console.log('useTraking latitude', location.latitude);
  const hasLocationPermission = async () => {
    // if (Platform.OS === 'ios') {
    //   Geolocation.requestAuthorization('always');
    // }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
      
    }
  };

  useEffect(() => {
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

    
    
    if (hasLocationPermission() || latitude == undefined || longitude == undefined) {
      console.log(latitude,longitude)
      const BoundaryData = [
      
        {
          lat: 33.5307432,
          lng: -7.6868358,
          radius: 100,
          id: 'Company',
        },
     
      ];
      BoundaryData.map((boundary) => {
        Boundary.add(boundary)
          .then(() => console.log('success!'))
          .catch((e) => console.log(e));
      });
    }

    Boundary.on(Events.ENTER, (id) => {
      setEnter(true)
      
    });
    Boundary.on(Events.EXIT, (id) => {
      console.warn('Exit Boundary ', id);
      setEnter(false)
    });

    if (Enter){
      PushNotification.localNotification({
        /* iOS and Android properties */
        title: "test", // (optional)
        message: "entered Zone", // (required)
       
      });
    }

    console.log(Enter,hasLocationPermission())
    
  }, [Enter]);

  // Cluster Zone Location
  const P0 = {latitude: 37.5692842, longitude: 126.8267638};
  const P1 = {latitude: 37.8949, longitude: 127.0586};
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>latitude : {location.latitude}</Text>
        <Text>longitude : {location.longitude}</Text>
        <Text>
          Boundary entered : {Enter ? 'Enter' : 'Not Enter'}
        </Text>
      </View>
    </View>
  );
};



export default LocationScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapConatiner: {
      flex: 3,
    },
    button: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
      margin: 40,
    },
  });