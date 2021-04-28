import React, { useState, useEffect } from 'react';
import {   View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'

import List from '../components/List/FormationList';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';

const FormationScreen = ({navigation}) => {
  const formation = useSelector(state => state.Formation_Reducer.formation);
   
  let secourisme = formation.filter(
    (formation) => formation.categorie.nom === 'secourisme' 
  );
  let Mannequin  = formation.filter(
    (formation) => formation.categorie.nom === 'Mannequin formation' 
  );
  

    return (
    <View style={styles.screen}>
      
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 }}>
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
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Formations</Text>
                  </View>

        </View>

        <View style={styles.box}>
               <Text style={{ fontWeight:'700',fontSize:15,color: COLORS.BLACK,marginTop:20,marginLeft:35 }}>Himaya et Save vous offre des formations aux gestes qui sauvent</Text>
               <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:35}}>
                 <Image
                      source={images.formation}
                      resizeMode="contain"
                      style={{
                          alignSelf:'flex-end',
                          width: 150,
                          height: 120,
                          margin:10,
                      }}
                  />
                   
                      
                      <Text style={{ color: COLORS.black,width:windowWidth*0.7,marginTop:25,marginLeft:-35}}>Inscrivez vous tout de suite pour plus d'informations visiter "Himaya.ma"</Text>  
                    </View>
                      
        </View>

      <ScrollView
      >
        <List formations={secourisme} title="Secourisme" navigation={navigation} />
        <List formations={Mannequin} title="Mannequin formation" navigation={navigation} />

      </ScrollView>
    </View>
    )
}

export default FormationScreen

const styles = StyleSheet.create ({
  box:{
    height:windowHeight/4,
    backgroundColor:COLORS.lightGray4,
    elevation:2,
    borderBottomRightRadius:100
    
  
  },
    screen: {
      flex: 1,
     backgroundColor:COLORS.white
    },
  });