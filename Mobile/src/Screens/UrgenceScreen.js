import React from 'react'
import { View, Text, StyleSheet, SafeAreaView,Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph,IconButton } from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import {windowWidth, windowHeight} from '../utils/Dimentions'

const UrgenceScreen = () => {
    return (
        <SafeAreaView style = {{backgroundColor:COLORS.white,flex:1}}>
            <Card style={styles.card}>
                <Card.Title title="Appelez" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                <View>
                    <View style={{marginLeft:15, flexDirection:'column',marginTop:-8}}>
                        <Title style={styles.titleDrawer}>Applez les service d'urgence</Title>
                    </View>
                </View>

                <TouchableOpacity onPress={() => alert("pressed") }>
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
    
    Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin"},
    
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
        fontSize: 15,
        margin: 30,
        marginTop : 20,
        fontWeight: 'bold',
        letterSpacing:1,
        color: COLORS.black
      
      },
    
    })

export default UrgenceScreen

