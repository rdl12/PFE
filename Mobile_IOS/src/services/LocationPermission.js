
import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if(Platform.OS === "ios"){
   // your code using Geolocation and asking for authorisation with

   geolocation.requestAuthorization()
}
    else if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      //alert("You can use the location");
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}