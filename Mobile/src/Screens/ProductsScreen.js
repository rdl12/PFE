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
      <List formations={Covid} title="Covid" navigation={navigation} />
      <List formations={Secours} title="Secours" navigation={navigation} />

    </ScrollView>
  </View>
  )

}

export default ProductsScreen

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