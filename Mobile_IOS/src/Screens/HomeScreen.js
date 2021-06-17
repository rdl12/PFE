import React,{useEffect,useState} from 'react'
import { View,StyleSheet,Text,Image,SafeAreaView, ImageBackground,Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, Colors, icons,images} from '../Constantes'
import {windowHeight,windowWidth} from '../utils/Dimentions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch,useSelector } from 'react-redux';
import moment from "moment";
import frLocale from "moment/locale/fr";
import { Fetch_Formation,Fetch_Products,Fetch_Categories,Fetch_ProductCategories,Fetch_stats_etat,Fetch_stats_prov } from '../redux/actions';

const HomeScreen = ({navigation,route}) => {
  const dispatch = useDispatch()
  const LoginInfo = useSelector(state => state.loginReducer);
  moment.updateLocale('fr', [frLocale]) 
  let currentDate = moment().format("dddd DD MMM")
 

  useEffect(() => {
      if(route.params){
          navigation.navigate('Notification',route.params)
      }
      dispatch(Fetch_Formation())
      dispatch(Fetch_Products())
      dispatch(Fetch_Categories())
      dispatch(Fetch_ProductCategories())
      dispatch(Fetch_stats_etat())
      dispatch(Fetch_stats_prov())
  }, [route]);
    return (
       <View style = {styles.view}>
     
           <View style = {styles.menuConatiner}>
           <View style = {styles.header}>
             
           </View>
           <View>
               <TouchableOpacity onPress = {() => navigation.openDrawer()}>
               <Image 
                style={{tintColor:COLORS.WHITE, marginTop:20}}
                source={images.menu_icon}
                resizeMode ='contain'/>
                </TouchableOpacity>
               </View>
               {/* <Image 
                source={images.logo_icon}
                style={{width:55,height:55}}
                /> */}
                {LoginInfo.isLoggedIn ? (<Icon   name="comments" size={37}  
                style={{display:'flex',flexDirection:'row', marginTop:20}} 
                color="white" 
                onPress = {() => navigation.navigate('chat')}  />):null}
           </View>
       <View style = {styles.bigContainer}>
            <Text style={styles.headerDate}>
                {currentDate.toUpperCase().split(' ')[0]}
             </Text>
             <Text style={styles.footerDate}>
                {currentDate.toUpperCase().split(' ')[1]}{currentDate.toUpperCase().split(' ')[2]}
             </Text>
       <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('UrgenceScreen')}>
                <Image 
                    style={{width:77,height:77,alignSelf:'center',tintColor:COLORS.primary}}
                    source={images.phone_icon}
                    resizeMode ='contain'
                    />
                <Text style = {styles.text}> URGENCE </Text>
               </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('Maps')} >
           <Image 
            style={{width:77,height:77,alignSelf:'center',tintColor:COLORS.primary}}
            source={images.location_icon}
            />
             <Text style = {styles.text}> Geolocaliser </Text>
           </TouchableOpacity>
            </View>
         
           </View>
           
           <View style = {styles.container}>
               <View style = {styles.imageContainer}>
               <TouchableOpacity onPress = {() => navigation.navigate('Tutorial')} >
                <Image 
                    style={{width:77,height:77,alignSelf:'center',tintColor:COLORS.primary}}
                    source={images.instruction_icon}
                    />
                <Text style = {styles.text}> Instruction </Text>
           </TouchableOpacity>
               </View>
            <View style = {styles.imageContainer}>
            <TouchableOpacity onPress = {() => navigation.navigate('Help')} >
           <Image 
            style={{width:77,height:77,alignSelf:'center',tintColor:COLORS.primary}}
            source={images.help_icon}
            />
              <Text style = {styles.text}> HELP </Text>
           </TouchableOpacity>
            </View>
         
           </View>
       
       </View>
         
          
       </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    background_image:{
        flex:0.3,
        width:windowWidth,
      },

      header:{
        backgroundColor:COLORS.primary,
        height:windowHeight*0.34,
        width:windowWidth,
        position:'absolute',
        top:0,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50
       

        
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
      backgroundColor:'rgba(238,252,255,1)',
      flex:1,

    },

    bigContainer:{
       display:'flex',
        marginTop:windowHeight*0.16
     

    },
    
    container:{
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    
    },
    imageContainer:{
        flex:0.5,
        borderWidth:1,
        borderColor:COLORS.white,
        backgroundColor:COLORS.white,
        alignItems:'center',
        padding:10,
        marginBottom:0,
        margin:27,
        borderRadius:10,
        elevation:5,
        shadowColor: "#001",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 3,
        
    },
    text:{
        textAlign: 'center',
        fontFamily:'cochin',
        letterSpacing:2,
        fontWeight:'bold',
        color:COLORS.black,
        fontSize:13,
        borderTopWidth:1,
        marginTop:20

    },
    headerDate: {
        fontSize: 40,
        // width: 120,
        alignSelf:"center",
        paddingTop: 5,
        marginLeft: 15,
        marginTop:-80,
        marginBottom:0,
        fontWeight: "400",
        opacity: 1,
        color:COLORS.white
      },
    footerDate: {
        fontSize: 15,
        // width: 120,
        alignSelf:"center",
        paddingTop: 5,
        marginLeft: 15,
        marginBottom:0,
        fontWeight: "400",
        opacity: 1,
        color:COLORS.white
      },
     
    })