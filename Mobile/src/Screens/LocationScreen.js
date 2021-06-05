import React,  {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import Dialog from "react-native-dialog";
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { HelpAction } from '../redux/actions'
import { useDispatch } from 'react-redux';



const LocationScreen = ({navigation}) => {
  const [lat, setlat] = useState('')
  const [long, setlong] = useState('')
  const [success, setsucess] = useState(false)

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
    setsucess(!success)
    setTimeout(() => {
       setsucess(false)
    }, 2000);
  }



  return (
    <View style={styles.container}>
       {/* Header */}
       <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, }}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => navigation.goBack()}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.black
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Help (S.O.S)</Text>
                  </View>

               </View>
      
      <View style={styles.box}>
               <Text style={{ fontWeight:'700',fontSize:13,color: COLORS.BLACK,marginTop:20,marginLeft:30 }}> Save vous permet d'envoyer votre position aux gens autour de vous pour demender de l'aide</Text>
               <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
                 <Image
                      source={{uri : 'https://cdn4.iconfinder.com/data/icons/communication-219/66/43-512.png'}}
                      resizeMode="contain"
                      style={{
                          alignSelf:'flex-end',
                          width: 100,
                          height: 70,
                          margin:25,
                          marginLeft:-19,
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
      <Dialog.Container visible={success}>
                    <Image
                        source={images.book_icon}
                        resizeMode="contain"
                        style={{
                            width: 300,
                            height: 100,
                        }}
                    />
                    <Dialog.Description>
                    demande d'aide envoyé avec succes
                    </Dialog.Description>
                   
      </Dialog.Container>
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

 