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

const ProductsScreen = ({navigation}) => {
    
    const [Covid, setCovid] = useState([{
        id:'1',
        nom:'Gel desinfectant',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/1/-/1-2736-9f702_1.png',
        desription:'test'
    },
    {
        id:'2',
        nom:'Thermomètre sans contact infrarouge',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/1/-/1-2734-e1329.png',
        desription:'test'
    },
    {
        id:'3',
        nom:'Distributeur de gel à pédale',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/2/7/2742-44064.JPG',
        desription:"test"
    },
])
    const [Secours, setSecours] = useState([{
        id:'1',
        nom:'Valise de secours 8/12 personnes',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/2/-/2-189-8546f.jpg',
        desription:'test'
    },
    {
        id:'2',
        nom:"Bouteille d'oxygène",
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/1/9/191-3bb6a.jpg',
        desription:'test'
    },
    {
        id:'3',
        nom:'Laveur d’yeux',
        image:'https://www.himaya.ma/pub/media/catalog/product/cache/682518d3a1b7519d2d6a6055134df333/2/-/2-200-f0c17.jpg',
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
                    <Text style={{ ...FONTS.h2, color: COLORS.black }}>Nos Produits</Text>
                </View>

      </View>

      <View style={styles.box}>
             <Text style={{ fontWeight:'600',fontSize:13,color: COLORS.BLACK,marginTop:20,marginLeft:30 }}>Himaya.ma (DefibMahreb SARL) apporte à toute entreprise, quel que soit sa taille ou son activité, une offre globale pour améliorer les conditions de travail des salariés. </Text>
             <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
                    <Text style={{ color: COLORS.black,width:windowWidth*0.6,fontSize:13,marginTop:25,marginLeft:2}}>Pour acheter ou voir plus de produits visiter notre site web:
                        <Text style={{color: 'blue', fontSize:20}}
                               onPress={() => Linking.openURL('https://www.himaya.ma/')}>
                               Himaya.ma 
                         </Text>
                    </Text> 
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
            </View>
                    
      </View>

    <ScrollView
    >
      <List formations={Covid} title="Covid" navigation={navigation} BOOKH = {170} BOOKW= {150} />
      <List formations={Secours} title="Secours" navigation={navigation} BOOKH = {170} BOOKW= {150} />
      
      <View style={{backgroundColor:"#0088CC", height:40,width:100, position:'absolute', bottom:205, left:50,zIndex:3}}><Text style={{color:COLORS.WHITE, alignSelf:"center", fontSize:20, fontFamily:"cochin", marginTop:3}}>Himaya</Text></View>
            <View style={{backgroundColor:"#121214", height:230,width:windowWidth, marginTop:10}}>
                <View style={{marginLeft:30, width:300}}>
                    <Text style={{fontWeight:'bold', color:COLORS.WHITE, marginTop:40}}>ADRESSE</Text>
                    <Text style={{color:"#A8A8A8"}}>DefibMaghreb SARLAU
                        56 rue Cadi BAKKAR, 1er ét. Quartier Berger (MAARIF),
                        20000 Casablanca - Maroc</Text>
                    <Text style={{fontWeight:'bold', color:COLORS.WHITE, marginTop:10}}>TEL</Text>
                    <Text style={{color:"#A8A8A8"}}>+212 522-984-177</Text>
                    <Text style={{fontWeight:'bold', color:COLORS.WHITE, marginTop:10}}>EMAIL</Text>
                    <Text style={{color:"#A8A8A8"}}>info@himaya.ma</Text>
                </View>
                
                
            </View>

    </ScrollView>
  </View>
  )

}

export default ProductsScreen

const styles = StyleSheet.create ({
    box:{
      height:windowHeight/4.3,
      backgroundColor:COLORS.lightGray4,
      elevation:2,
      borderBottomRightRadius:100
      
    
    },
      screen: {
        flex: 1,
       backgroundColor:COLORS.white
      },
    });