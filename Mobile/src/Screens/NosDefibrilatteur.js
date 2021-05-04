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
             <Text style={{ fontWeight:'700',fontSize:13,color: COLORS.BLACK,marginTop:20,marginLeft:30 }}>Himaya et Save vous offre des formations aux gestes qui sauvent</Text>
             <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
               <Image
                    source={images.formation}
                    resizeMode="contain"
                    style={{
                        alignSelf:'flex-end',
                        width: 120,
                        height: 90,
                        margin:10,
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
      <List formations={defib} title="Défibrillateur" navigation={navigation} BOOKH = {170} BOOKW= {100} />
      <List formations={AccessDefib} title="Accessoires Défibrillateurs" navigation={navigation} BOOKH = {170} BOOKW= {42}/>

    </ScrollView>
  </View>
  )

}

export default NosDefibrilatteur

const styles = StyleSheet.create ({
    box:{
      height:windowHeight/4.4,
      backgroundColor:COLORS.lightGray4,
      elevation:2,
      borderBottomRightRadius:100
      
    
    },
      screen: {
        flex: 1,
       backgroundColor:COLORS.white
      },
    });