import React,{useEffect,useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { connect,useSelector,useDispatch } from 'react-redux'
import { View, Text } from 'react-native'
import {Fetch_By_id} from '../redux/actions'

const UrgenceMap = ({ navigation, route }) => {
   
     const [identifiers, setIdentifiers] = useState([])
     //const state = useSelector(state => state.state)
     const dispatch = useDispatch()

    useEffect(() => {
        const {id} = route.params
        setIdentifiers(parseFloat(id))
        console.log(identifiers)
        if(identifiers.length != 0){
            dispatch(Fetch_By_id(identifiers))
        }
      
        
    }, [identifiers])
    return (
        <View style = {{flex:1}}>
        {/* <MapView style = {{flex:1}}
            //ref={mapView}
            mapType = 'standard'
            scrollEnabled = {false}
            showsTraffic ={true}
            initialRegion={{
                latitude:Get_Defib.Defibrilatteur.latitude,
                longitude :Get_Defib.Defibrilatteur.longitude,
                latitudeDelta : 0.0008,
                longitudeDelta : 0.0016
                }}
            >

      </MapView> */}
    </View>
    )
}

export default UrgenceMap
