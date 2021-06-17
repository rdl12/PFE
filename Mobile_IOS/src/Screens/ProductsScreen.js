import React, { useState, useEffect } from 'react';
import {   View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  SafeAreaView,
  StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'


import List from '../components/List/FormationList';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'


const ProductsScreen = ({navigation}) => {
    const Products = useSelector(state => state.Products_Reducer.products)
    const categories = useSelector(state => state.Product_Category_Reducer.product_categories)
  
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
  <SafeAreaView style={styles.screen}>
    
      <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, backgroundColor:COLORS.WHITE, alignItems: 'center',elevation:3,marginBottom:0, shadowOpacity: 0.4, }}>
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
            <View>
                    <Text style={{ fontWeight:'600',fontSize:13,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Himaya.ma (DefibMahreb SARL) apporte à toute entreprise, quel que soit sa taille ou son activité, une offre globale pour améliorer les conditions de travail des salariés. </Text>
                    <Image
                        source={images.himaya_logo}
                        resizeMode="contain"
                        style={{
                            width: windowWidth,
                            height: 80,
                        }}
                    /> 
             </View>
             <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:30}}>
                    {/* <Image
                        source={{uri : 'https://images-na.ssl-images-amazon.com/images/I/4157jSarsYL.png'}}
                        resizeMode="contain"
                        style={{
                            alignSelf:'flex-end',
                            width: 120,
                            height: 90,
                            margin:0,
                        }}
                    />  */}
                    <Text style={{ color: COLORS.black,fontSize:15,margin:20,marginLeft:2}}>Pour acheter ou voir plus de produits visiter notre site web  <Text style={{color: 'blue', fontSize:17}}
                               onPress={() => Linking.openURL('https://www.himaya.ma/')}>
                                :     Himaya.ma 
                         </Text>
                    </Text> 
            </View>
                    
      </View>

    <ScrollView
    >
       {
          categories.map(item => {
            let category = Products.filter(
              (product) => product.categorie.nom === item.nom
            );
        if (category.length != 0)
        {
            return <List key = {item.id} formations={category} title={item.nom} navigation={navigation} BOOKW = {120} BOOKH = {140} products = {true}/>
        }
          

          }
            )
        } 
      
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
  </SafeAreaView>
  )

}

export default ProductsScreen

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