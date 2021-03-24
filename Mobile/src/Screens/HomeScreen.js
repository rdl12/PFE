import React from 'react'
import { View,StyleSheet,Text,Image,SafeAreaView, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, Colors, icons,images} from '../Constantes'
import {windowHeight,windowWidth} from '../utils/Dimentions'

const HomeScreen = ({navigation}) => {
    return (
       <SafeAreaView style = {styles.view}>
           <ImageBackground source = {{uri:'https://www.condair-merchandising.com/pub/img/home-hero-wave.png'}} resizeMode='cover'  style={styles.background_image}>
           <View style = {styles.menuConatiner}>
                <View>
               <TouchableOpacity onPress = {() => navigation.openDrawer()}>
               <Image 
                style={styles.menu}
                source={images.menu_icon}
                resizeMode ='contain'
                tintColor={COLORS.black}/>
                </TouchableOpacity>
               </View>
               {/* <Image 
                source={images.logo_icon}
                style={{width:55,height:55}}
                /> */}
           </View>
           </ImageBackground>
           <ImageBackground source = {{uri:'https://cdn.pixabay.com/photo/2017/05/16/11/45/blue-waves-2317606_960_720.png'}} resizeMode='cover'  style={{flex:1}}>
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('UrgenceScreen')}>
                <Image 
                    style={{width:77,height:77}}
                    source={images.phone_icon}
                    resizeMode ='contain'
                    tintColor='red'/>
                <Text style = {styles.text}> URGENCE </Text>
               </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('Maps')} >
           <Image 
            style={{width:77,height:77,marginLeft:13}}
            source={images.location_icon}
            tintColor={COLORS.primary}/>
             <Text style = {styles.text}> Geolocaliser </Text>
           </TouchableOpacity>
            </View>
         
           </View>
           
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('')} >
                <Image 
                    style={{width:77,height:77,marginLeft:9}}
                    source={images.instruction_icon}
                    tintColor="#D2691E"/>
                <Text style = {styles.text}> Instruction </Text>
           </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')} >
           <Image 
            style={{width:77,height:77}}
            source={images.help_icon}
            tintColor='green'/>
              <Text style = {styles.text}> HELP </Text>
           </TouchableOpacity>
            </View>
         
           </View>
           </ImageBackground>
          
       </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    background_image:{
        marginTop:-10,
        flex:0.3,
        width:windowWidth,
      },

    logo:{
      flex:1
      
    },
    menuConatiner:{
        flexDirection:'row',
        padding:20,
        justifyContent:'space-between',
    },

    view :{
      display:'flex',
      backgroundColor:COLORS.white,
      flex:1,

    },
    
    container:{
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imageContainer:{
        flex:0.5,
        borderWidth:1,
        borderColor:COLORS.primary,
        backgroundColor:COLORS.white,
        alignItems:'center',
        padding:10,
        marginTop:20,
        marginBottom:0,
        margin:27,
        
        borderRadius:10
    },
    text:{
        textAlign: 'center',
        letterSpacing:1,
        fontFamily:'cochin',
        letterSpacing:2,
        fontWeight:'bold',
        color:COLORS.black,
        fontSize:13,
        borderTopWidth:1,
        marginTop:20

    }
     
    })
