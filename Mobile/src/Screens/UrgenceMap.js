import React,{useEffect,useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { connect,useSelector,useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity,StyleSheet ,Image} from 'react-native'
import { Avatar, Button, Card,ActivityIndicator, Title, Paragraph,IconButton} from 'react-native-paper';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import {Fetch_By_id} from '../redux/actions'
import {images,COLORS, FONTS} from '../Constantes'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../utils/constants/Api'
import Geolocation from '@react-native-community/geolocation';
import { windowHeight, windowWidth } from '../utils/Dimentions';

const UrgenceMap = ({ navigation, route }) => {
   
     const [identifiers, setIdentifiers] = useState([])
     const [DistanceTravel, setDistanceTravel] = useState(0)
     const [TimeTravel, setTimeTravel] = useState(0)
     const coords = useSelector(state => state.Boundary_Reducer.Boundary)
     const [showDirections, setshowDirections] = useState(true)
     const [origin, setorigin] = useState({latitude:0,longitude:0})
     const [marginBottom , setmarginBottom ] = useState(1)
     const dispatch = useDispatch()
     

     Geolocation.getCurrentPosition(data => {
        setorigin({...origin,latitude:data.coords.latitude,longitude:data.coords.longitude})
      }, (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 })    
    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        setTimeout(()=>setmarginBottom(0),10)
        const {id} = route.params
        parent.setOptions({
            tabBarVisible: false,  
            tabBarButton: (props) => (
                       <TabBarCustomButton visible
                            {...props}
                        /> ),
      });
        setIdentifiers(parseFloat(id))
        if(identifiers.length != 0){
            dispatch(Fetch_By_id(identifiers))
        }
        return () =>
        parent.setOptions({
             tabBarVisible: true,
             tabBarButton: (props) => (
                      <TabBarCustomButton 
                          {...props}
                      />),
         });
    }, [identifiers])
    return (
        <View style = {{flex:1}}>
       {  coords === undefined ? ( <ActivityIndicator size="large" animating = {true}  style = {{flex : 1,justifyContent:'center' ,alignItems:'center'}} />) 
       : ( <View style = {{flex:1}}>
           <MapView style = {{flex:1,  marginBottom : marginBottom,}}
                //ref={mapView}
                mapType = 'standard'
                scrollEnabled = {true}
                showsUserLocation = {true}
                showsMyLocationButton = {true}
                showsTraffic ={false}
                initialRegion={{
                    latitude:coords.lat,
                    longitude :coords.lng,
                    latitudeDelta : 0.0008,
                    longitudeDelta : 0.0016
                    }}
                >
        <Marker
            key={coords.id}
            coordinate={{latitude : coords.lat, longitude : coords.lng }}
            color = 'red'
          
           // anchor={{ x: 0, y: 0}}
           >
               <Image
                    source={images.heart_icon}
                    resizeMode='contain'
                    style = {{tintColor:'red',width:40,height:35}}  /> 
           </Marker>
       {!showDirections ? ( <MapViewDirections
            origin={origin}
            destination={{latitude:coords.lat,longitude:coords.lng}}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            mode = 'WALKING'
            strokeColor={COLORS.primary}
            onReady={result => {
                setDistanceTravel(result.duration)
                setTimeTravel(result.distance)
                }}
        /> ) :( <MapViewDirections
            origin={origin}
            destination={{latitude:coords.lat,longitude:coords.lng}}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={0}
            mode = 'WALKING'
            strokeColor={COLORS.primary}
            onReady={result => {
                setDistanceTravel(result.duration)
                setTimeTravel(result.distance)
                }}
        /> )}
      </MapView>
{ showDirections ?  ( <Card style={styles.card}>
        
            <Card.Title title="Arret Cardiaque a proximite" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",alignSelf:'center'}} style={styles.cardTitle}/>
            <Card.Content style={{justifyContent:'center'}}>
                <View>
                <View style = {styles.directions}>
                  <Image
                    source={images.directions}
                    resizeMode='contain'
                    style = {styles.icon}  /> 
                  <Text style = {styles.info}>Distance: {Math.round(DistanceTravel*1000)} m</Text>
                  <Image
                    source={images.timer}
                    resizeMode='contain'
                    style = {styles.icon}  /> 
                 <Text  style = {styles.info}>Time : {TimeTravel} min</Text>
             </View>
                <TouchableOpacity onPress = { () => setshowDirections(!showDirections) } style = {styles.Aide}>
                    <Text style = {styles.text}>Accepter D'aider</Text>
                </TouchableOpacity>
                </View>
            </Card.Content>
    </Card>): null}
    </View>
        )}
    </View>
    )
}

export default UrgenceMap
const styles = StyleSheet.create({
    card :{
        position:'absolute',
        bottom:0,
        width:windowWidth*0.9,
        height:windowHeight*0.3,
        alignSelf:'center',
        shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.43,
         shadowRadius: 9.51,
        elevation: 3,
        zIndex:2,
        margin:15,
        borderRadius:20

      },
    
    cardTitle : {borderBottomWidth:0.45},
    
    Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin"},
    
    para : {marginTop:10},
    
    add_to_photo:{
        height:100 ,
        width:100,
       margin:15,
       tintColor : '#0000FF'},
    
    icon:{width: 20,  height: 10, padding:0},
    directions:{
      display:'flex',
      flexDirection:'row',
      marginLeft:-10
     
    },
    Aide:{
        alignSelf:'center',
        borderWidth:1,
        padding:20,
        width:windowWidth*0.8,
        margin:20,
        borderRadius:20,
        backgroundColor:COLORS.primary
    },
    text:{
      alignSelf:'center',
      color:COLORS.white,
      fontSize:20,
      fontFamily: "OpenSans",
       fontWeight:"600",

       //fontHeader: "Baloo",
    },
    icon:{
        height:30,
        width:30  ,
        margin:15,
        tintColor : '#0000FF'
    },
    info:{
        alignSelf:'center',
        fontSize:15,
        color:COLORS.darkgray,
      
    }
    
    })