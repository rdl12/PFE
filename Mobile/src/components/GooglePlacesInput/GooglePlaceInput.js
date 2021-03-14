import React from 'react'
import { View, Text } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlaceInput = () => {
    return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('search')
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyC8drf5LBydUKkwusrLEllcXFOqVBni1mY',
          language: 'en',
        }}
        
      />
    )
}

export default GooglePlaceInput
