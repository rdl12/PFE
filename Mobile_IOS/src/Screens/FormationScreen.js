import React, { useState, useEffect } from 'react';
import {   View, Text,TouchableOpacity,Image,ScrollView,Linking,StyleSheet,SafeAreaView} from 'react-native'
import {useSelector} from 'react-redux'

import List from '../components/List/FormationList';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'

  const FormationScreen = ({navigation}) => {
  const formation = useSelector(state => state.Formation_Reducer.formation);
  const categories = useSelector(state => state.Categories_Reducer.categories)

      useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
              tabBarVisible: false,  
              tabBarButton: (props) => (
                        <TabBarCustomButton visible
                              {...props}
                          /> ),
        });
      return () =>
          parent.setOptions({
                tabBarVisible: true,
                tabBarButton: (props) => (
                        <TabBarCustomButton 
                            {...props}
                        />),
            });
    }, [navigation])
   
  let secourisme = formation.filter(
    (formation) => formation.categorie.nom === 'secourisme' 
  );
  let Mannequin  = formation.filter(
    (formation) => formation.categorie.nom === 'Mannequin formation' 
  );
  
 

    return (
    <SafeAreaView style={styles.screen}>
      
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60,backgroundColor:COLORS.WHITE, alignItems: 'center',elevation:3,marginBottom:0, shadowOpacity: 0.4,}}>
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
               <Text style={{ fontWeight:'700',fontSize:13,color: COLORS.BLACK,marginTop:20,marginLeft:30, marginBottom:10 }}>Himaya et Save vous offre des formations aux gestes qui sauvent</Text>
               <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
                 <Image
                      source={images.formation}
                      resizeMode="contain"
                      style={{
                          alignSelf:'flex-end',
                          width: 120,
                          height: 90,
                          margin:5,
                      }}
                  />
                   
                      
                      <Text style={{ color: COLORS.black,width:windowWidth*0.7,fontSize:13,marginTop:25,marginLeft:-35}}>Inscrivez-vous tout de suite pour plus d'informations visiter : <Text style={{color: 'blue'}}
                                     onPress={() => Linking.openURL('https://www.himaya.ma/')}>
                                     Himaya.ma  </Text>
                      </Text>  
                    </View>
                      
        </View>

      <ScrollView
      >
        {
          categories.map(item => {
            let category = formation.filter(
              (formation) => formation.categorie.nom === item.nom
            );
            return <List key = {item.id} formations={category} title={item.nom} navigation={navigation} BOOKW = {170} BOOKH = {230}/>
          }
            )
        } 
      </ScrollView>
    </SafeAreaView>
    )
}

export default FormationScreen

const styles = StyleSheet.create ({
  box:{
   
    backgroundColor:COLORS.lightGray4,
    elevation:2,
    borderBottomRightRadius:100
    
  
  },
    screen: {
      flex: 1,
     backgroundColor:COLORS.white
    },
  });