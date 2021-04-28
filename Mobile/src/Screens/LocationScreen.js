import React,  {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {FONTS, COLORS, SIZES, images} from '../Constantes'

import { windowHeight, windowWidth } from '../utils/Dimentions';

import { HelpAction } from '../redux/actions'
import { useDispatch } from 'react-redux';



const LocationScreen = () => {
  const [lat, setlat] = useState('')
  const [long, setlong] = useState('initialState')
  Geolocation.getCurrentPosition(data => {
        setlat(data.coords.latitude) ; 
        setlong(data.coords.longitude);  
  }, (error) => alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 })   
  
  const [Enter, setEnter] = useState(false);
  const dispatch = useDispatch()
  const Help = () => {
      const object = {
      "lat":lat,
      "lng":long,
      "radius":100.0
    }
       HelpAction(object)
  }



  return (
    <View style={styles.container}>
      
      <View style={styles.box}>
               <Text style={{ fontWeight:'700',fontSize:13,color: COLORS.BLACK,marginTop:20,marginLeft:30 }}> Save vous permet d'envoyer votre position aux gens autour de vous pour demender de l'aide</Text>
               <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
                 <Image
                      source={{uri : 'https://cdn4.iconfinder.com/data/icons/communication-219/66/43-512.png'}}
                      resizeMode="contain"
                      style={{
                          alignSelf:'flex-end',
                          width: 100,
                          height: 60,
                          margin:15,
                          marginLeft:-19,
                          marginBottom:0
                      }}
                  />
                   
                      
                      <Text style={{ color: COLORS.black,width:windowWidth*0.7,fontSize:13,marginTop:25,marginLeft:-35}}>Appuyer sur le bouton ci-dessous pour qu'une notification soit declanchée</Text>  
                    </View>
                      
        </View>
        <View style={styles.infoContainer}>
        <TouchableOpacity  style={{
                      flex: 0.15,
                      backgroundColor: COLORS.primary,
                      marginHorizontal: SIZES.base,
                      marginVertical: SIZES.base,
                      borderRadius: SIZES.radius,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }} onPress = {() => Help()}>
          <Text style={{fontSize:20,color:COLORS.WHITE, letterSpacing:2}}>demande d'aide</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default LocationScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.WHITE
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
    box:{
      height:windowHeight/4.4,
      backgroundColor:COLORS.lightGray4,
      elevation:2,
      borderBottomRightRadius:100
      
    
    },
  });

 