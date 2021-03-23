import React from 'react'
import { View,StyleSheet,Text,Image,SafeAreaView, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, Colors, icons,images} from '../Constantes'


const HomeScreen = ({navigation}) => {
    return (
       <SafeAreaView style = {styles.view}>
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
               <Image 
                source={images.logo_icon}
                style={{width:55,height:55}}
             
                />
             
           </View>
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('UrgenceScreen')}>
                <Image 
                    style={{width:77,height:77}}
                    source={images.phone_icon}
                    resizeMode ='contain'
                    tintColor='red'/>
                <Text style = {styles.text}> Urgence </Text>
               </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('Maps')} >
           <Image 
            style={{width:77,height:77,marginLeft:15}}
            source={images.location_icon}
            tintColor='red'/>
             <Text style = {styles.text}> Se Localiser </Text>
           </TouchableOpacity>
            </View>
         
           </View>
           
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('')} >
                <Image 
                    style={{width:77,height:77,marginLeft:7}}
                    source={images.instruction_icon}
                    tintColor='red'/>
                <Text style = {styles.text}> Instruction </Text>
           </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('Login')} >
           <Image 
            style={{width:77,height:77}}
            source={images.help_icon}
            tintColor='red'/>
              <Text style = {styles.text}> Help </Text>
           </TouchableOpacity>
            </View>
         
           </View>
        
       </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
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
        flex:0.75,
        borderWidth:1,
        borderColor:COLORS.primary,
        display:'flex',
        alignItems:'center',
        marginTop:30,
        padding:20,
        margin:15,
        borderRadius:10
    },
    text:{
        textAlign: 'center',
        letterSpacing:1,
        fontFamily:'ninchio',
        fontWeight:'bold',
        color:'red',
        fontSize:15,
        borderTopWidth:1,
        marginTop:20

    }
     
    })
