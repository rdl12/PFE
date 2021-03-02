import { View,Text,Image,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BaseMapSwitcher from '../components/BaseMapSwitcher'

function MapScreen() {
    const [Basemap, setBasemap] = useState("standard");


    return (
        <View style = {{flex:1}}>
            <BaseMapSwitcher/>

           <MapView style = {{flex:1}}
             mapType = {Basemap}
           >    
           </MapView>
        </View>
    )
}

export default MapScreen
