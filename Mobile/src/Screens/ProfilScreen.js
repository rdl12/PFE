import React from 'react'
import { View,StyleSheet,Image,SafeAreaView, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, Colors, icons,images} from '../Constantes'
import {windowHeight,windowWidth} from '../utils/Dimentions'
import {useSelector} from 'react-redux'
import {Avatar,Title,Caption,Text,} from 'react-native-paper';
import { UrlTile } from 'react-native-maps'

const ProfilScreen = ({navigation}) => {
    const LoginInfo = useSelector(state => state.loginReducer);
    return (
       <SafeAreaView style = {styles.view}>
           <View style = {styles.box}>
           <ImageBackground source = {{uri:'https://wallpapercave.com/wp/wp3369520.jpg'}} resizeMode='cover'  style = {styles.profilContainer}>
           <View >
                 <Avatar.Image 
                            source={{
                                uri: 'https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png'
                            }}
                            size={60}
                            style={{marginLeft:60,borderRadius:2,backgroundColor:COLORS.white,borderRadius:20}}
                        />
                        <View style={{marginLeft:15, flexDirection:'column',marginTop:8}}>
                            <Title style={styles.titleDrawer}>Bonjour {LoginInfo.userId.split('@')[0]} </Title> 
                            <Caption>{LoginInfo.userId}</Caption>
                        </View>
            </View>
            </ImageBackground>
          
          
           
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('')} >
                <Image 
                    style={{width:30,height:30,marginLeft:42}}
                    source={images.instruction_icon}
                    tintColor={COLORS.primary}/>
                <Text style = {styles.text}> Info Generales</Text>
           </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('MyDefibs')} >
           <Image 
            style={{width:30,height:30,marginLeft:39}}
            source={images.help_icon}
            tintColor='green'/>
              <Text style = {styles.text}>Mes Defibs ajoutés</Text>
           </TouchableOpacity>
            </View>
         
           </View>
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('')} >
                <Image 
                    style={{width:30,height:30,marginLeft:42}}
                    source={images.instruction_icon}
                    tintColor={COLORS.primary}/>
                <Text style = {styles.text}> Info Generales</Text>
           </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('MyDefibs')} >
           <Image 
            style={{width:30,height:30,marginLeft:39}}
            source={images.help_icon}
            tintColor='green'/>
              <Text style = {styles.text}>Mes Defibs ajoutés</Text>
           </TouchableOpacity>
            </View>
         
           </View>
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('')} >
                <Image 
                    style={{width:30,height:30,marginLeft:42}}
                    source={images.instruction_icon}
                    tintColor={COLORS.primary}/>
                <Text style = {styles.text}> Info Generales</Text>
           </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('MyDefibs')} >
           <Image 
            style={{width:30,height:30,marginLeft:39}}
            source={images.help_icon}
            tintColor='green'/>
              <Text style = {styles.text}>Mes Defibs ajoutés</Text>
           </TouchableOpacity>
            </View>
         
           </View>
           </View>
       </SafeAreaView>
    )
}

export default ProfilScreen

const styles = StyleSheet.create({
    profilContainer : {
        padding:50,
        marginLeft : 7,
        marginRight : 5,
        marginTop:-20,
        borderRadius : 20,
        elevation:5,
    },

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
        padding:10,
        justifyContent:'space-between',
    },

    view :{
      display:'flex',
      backgroundColor:COLORS.lightGray3,
      flex:1,
      

    },

    box : {
        margin:50,
        
    },
    
    container:{
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:3,
        marginLeft:7,
        marginRight:7,
        marginBottom:-10,
    },
    imageContainer:{
        flex:0.5,
        backgroundColor:COLORS.white,
        alignItems:'center',
        padding:10,
        marginTop:20,
        marginBottom:0,
        margin:7,
    },
    text:{
        textAlign: 'center',
        fontSize:12,
        letterSpacing:1,
        fontFamily:'cochin',
        letterSpacing:2,
        color:COLORS.black,
        margin:5

    },
    titleDrawer:{
        fontSize: 17,
        fontFamily:'cochin',
        marginTop: 3,
        marginLeft:-31.5,
        fontWeight: 'bold',
        letterSpacing:1,
        color: COLORS.white,
        
    },  
    
     
    })
