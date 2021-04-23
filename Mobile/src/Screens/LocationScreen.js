import React,  {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import useBackgroundGeolocationTracker from '../components/BgTracking';


import { HelpAction } from '../redux/actions'
import { useDispatch } from 'react-redux';



const LocationScreen = () => {
  
  const [Enter, setEnter] = useState(false);
  const location = useBackgroundGeolocationTracker();
  const dispatch = useDispatch()
 
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

  const Help = () => {
      const object = {
      "lat":location.latitude,
      "lng":location.longitude,
      "radius":100.0
    }
       HelpAction(object)
  }



  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>latitude : {location.latitude}</Text>
        <Text>longitude : {location.longitude}</Text>
        <Text>
          Boundary entered : {Enter ? 'Enter' : 'Not Enter'}
        </Text>
        <TouchableOpacity onPress = {() => Help()}>
          <Text>Help</Text>
        </TouchableOpacity>
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