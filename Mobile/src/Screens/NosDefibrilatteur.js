import React, { useState, useEffect } from 'react';
import {   View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'

import List from '../components/List/FormationList';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'

const NosDefibrilatteur = ({navigation}) => {
    const [defib, setdefib] = useState([{
        id:'1',
        nom:'Defibrillateur Lifeline AUTO Defibtech',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/3/-/3-174-8ef0f.jpg',
        desription:'test'
    },
    {
        id:'2',
        nom:'Defibrillateur Lifeline View',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/1/-/1-175-bcf39.jpg',
        desription:'test'
    },
    {
        id:'3',
        nom:'Défibrillateur Lifeline ECG',
        image:'https://www.defibtech.ma/img/produits/181-9b46c.png',
        desription:"test"
    },
])
    const [AccessDefib, setSecours] = useState([{
        id:'1',
        nom:'Boitier mural avec alarme',
        image:'https://www.defibtech.ma/img/produits/192-a7f30.jpg',
        desription:'test'
    },
    {
        id:'2',
        nom:"Paquet de tampons de défibrillation pour adultes (DDP-100)",
        image:'https://www.defibtech.ma/img/produits/184-68e46.png',
        desription:'test'
    },
    {
        id:'3',
        nom:'Batterie de remplacement pour quatre ans (DCF-2003)',
        image:'https://www.defibtech.ma/img/produits/191-eb937.png',
        desription:'test'
    },
    ])
  
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
                    <Text style={{ ...FONTS.h2, color: COLORS.black }}>Nos Defibs</Text>
                </View>

      </View>

      <View style={styles.box}>
            <View>
                    <Text style={{ fontWeight:'700',fontSize:15,color: COLORS.BLACK,marginTop:20,marginLeft:30 }}>DefibTech est le leader du mlarcher dans le domaine des defibrillateurs</Text>
                    <Image
                        source={{uri : 'https://www.defibtech-aed.ch/wp-content/uploads/2018/07/logo.png'}}
                        resizeMode="contain"
                        style={{
                            width: windowWidth,
                            height: 80,
                            marginTop:10,
                            marginLeft:-20,
                        }}
                    /> 
             </View>
             
             <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
               {/* <Image
                    source={images.formation}
                    resizeMode="contain"
                    style={{
                        alignSelf:'flex-end',
                        width: 120,
                        height: 90,
                        margin:10,
                    }}
                /> */}
                 
                    
                    <Text style={{ color: COLORS.black,fontSize:15,margin:20,marginLeft:2,marginTop:0}}>Pour acheter ou voir plus de produits visiter notre site web  <Text style={{color: 'blue', fontSize:17}}
                                   onPress={() => Linking.openURL('https://www.defibtech.ma')}>
                                   :   defibtech.ma  </Text>
                    </Text>  
                  </View>
                    
      </View>

    <ScrollView
    >
      <List formations={defib} title="Défibrillateur" navigation={navigation} BOOKH = {150} BOOKW= {150} products = {true}/>
      <List formations={AccessDefib} title="Accessoires Défibrillateurs" navigation={navigation} BOOKH = {150} BOOKW= {150} products = {true}/>

    </ScrollView>
  </View>
  )

}

export default NosDefibrilatteur

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