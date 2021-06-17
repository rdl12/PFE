import React,{useState,useEffect,} from 'react'
import { View, Text, StyleSheet, SafeAreaView,Image, TouchableOpacity, Linking } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph,IconButton } from 'react-native-paper';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import {windowWidth, windowHeight} from '../utils/Dimentions'

const UrgenceScreen = ({navigation}) => {

    const [next, setNext] = useState(true); 
    const numStyle = {fontSize:30,color:'red'}

    return (

    <SafeAreaView style = {{backgroundColor:COLORS.white,flex:1}}>
         {/* Header */}
       <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, backgroundColor:COLORS.WHITE, alignItems: 'center',elevation:3,marginBottom:20, shadowOpacity: 0.4,}}>
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
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Urgence</Text>
                  </View>

               </View>
      
        
          {
            
            next ? (  
            <Card style={styles.card}>
                <Card.Title title="Appelez" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:23}} style={styles.cardTitle}
                            right={(props) => <IconButton {...props} icon={images.next_icon} size={25}  onPress={() => {setNext(false)}} />}/>
                <Card.Content>
                    <View>
                        <View style={{ flexDirection:'column'}}>
                            <Title style={styles.titleDrawer}>Applez les service d'urgence au :</Title>
                            <Title style={[styles.titleDrawer,{...numStyle}]}>15</Title>
                        </View>
                    </View>
                    <Image 
                        style={{width:150,height:150,marginTop:10,alignSelf:'center'}}
                        source={images.urgence}
                    />
                    <TouchableOpacity onPress={()=>{Linking.openURL('tel:15');} }>
                        <View style = {styles.button}>
                            <Image 
                                style={{width:55,height:55}}
                                source={images.phone_icon}
                                tintColor='red'/>
                            <Text style={styles.textButton}>Appelez...</Text>
                        </View>
                    </TouchableOpacity>
                </Card.Content>
             </Card>
             
            ) :

             <Card style={styles.card}>
                <Card.Title title="Massage cardiaque" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:20,marginLeft:10}} style={styles.cardTitle}
                            left={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{transform: [{rotateY: '180deg'}]}}  onPress={() => {setNext(true)}} />}
                            right={(props) => <IconButton {...props} icon={images.next_icon} size={25} style={{marginRight:20}} onPress={() => navigation.navigate('ListDefib')} />}/>
                <Card.Content>
                    <View>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.titleDrawer}>Masser la victime a 100/120 min par minute</Title>
                        </View>
                    </View>
                    <Image 
                        style={{width:windowWidth/1.4,height:windowHeight/3.3,marginTop:80,alignSelf:'center'}}
                        source={images.massage_icon}
                    />
                </Card.Content>
             </Card>
            }
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card :{
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.43,
         shadowRadius: 9.51,
         
         elevation: 15,
         margin:15,},
    
    cardTitle : {borderBottomWidth:0.5},
    
    Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin",},
    
    para : {marginTop:10},
    
    button : {
        borderWidth:2,
        margin:10,
        borderColor:'red',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-evenly'
    
    },
    
    textButton:{
        color:'red',
        alignSelf:"center",
        fontSize:25,
        fontFamily:'cochin',
        letterSpacing : 5,
    },
    
    title: {
        
        fontSize: 13,
        marginTop: 3,
        fontWeight: 'bold',
        letterSpacing:1,
        color: COLORS.darkgray
      },
    
    caption: {
        fontSize: 14,
        lineHeight: 14,
      },

    icon:{width: 20,  height: 10,},

    titleDrawer:{
        textAlign: 'center',
        fontSize: 18,
        marginTop : 20,
        fontWeight: 'bold',
        letterSpacing:1,
        color: COLORS.black
      
      },

    
    })

export default UrgenceScreen