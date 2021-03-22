import React,{useState,useEffect,} from 'react'
import { View, Text, StyleSheet, SafeAreaView,Image, TouchableOpacity, Linking } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph,IconButton } from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import {windowWidth, windowHeight} from '../utils/Dimentions'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const UrgenceScreen = ({navigation}) => {

    const [next, setNext] = useState(true); 

    return (
        <SafeAreaView style = {{backgroundColor:COLORS.white,flex:1}}>
     {next ? (  
            <Card style={styles.card}>
                <Card.Title title="Appelez" titleStyle={{color:COLORS.primary,fontFamily: "Cochin",fontWeight: 'bold',fontSize:23}} style={styles.cardTitle}
                            right={(props) => <IconButton {...props} icon={images.next_icon} size={25}  onPress={() => {setNext(false)}} />}/>
                <Card.Content>
                <View>
                    <View style={{ flexDirection:'column',marginTop:-8}}>
                        <Title style={styles.titleDrawer}>Applez les service d'urgence</Title>
                    </View>
                </View>

                <Image 
                      style={{width:150,height:150,marginLeft:95,marginTop:10,borderWidth:2}}
                       source={images.urgence}
                            />

                <TouchableOpacity onPress={()=>{Linking.openURL('tel:15');} }>
                  <View style = {styles.button}>
                        <Image 
                            style={{width:55,height:55,marginLeft:15}}
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
                    <View style={{marginLeft:15, flexDirection:'column',marginTop:-8}}>
                        <Title style={styles.titleDrawer}>Masser la victime a 100/120 min par minute</Title>
                    </View>
                </View>

                        <Image 
                            style={{width:280,height:290,marginLeft:15,marginTop:30,borderWidth:2}}
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

         height:windowHeight/1.35,
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.43,
         shadowRadius: 9.51,
         
         elevation: 15,
        margin:15,
        
        marginTop:10},
    
    cardTitle : {borderBottomWidth:0.45},
    
    Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin",},
    
    para : {marginTop:10},
    
    button : {borderWidth:2,
        margin:10,
        borderColor:'red',
        padding:15,
        paddingLeft:3,
        paddingRight:3,
        borderRadius:10,
        flexDirection:'row'
    
    },
    
    textButton:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:40,
        color:'red',
        fontSize:25,
        fontFamily:'cochin',
        letterSpacing : 5,
        top:7
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

    icon:{width: 20,  height: 10, padding:0},

    titleDrawer:{
        textAlign: 'center',
        fontSize: 15,
        alignContent:'center',
        marginTop : 20,
        fontWeight: 'bold',
        letterSpacing:1,
        color: COLORS.black
      
      },
    
    })

export default UrgenceScreen

