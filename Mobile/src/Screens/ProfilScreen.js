import React, { useEffect,useState } from 'react'
import { View,StyleSheet,Image,SafeAreaView, ImageBackground, ScrollView, Text,Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import {windowHeight,windowWidth} from '../utils/Dimentions'
import {useSelector,useDispatch} from 'react-redux'
import {Avatar,Title,Caption,List,Switch } from 'react-native-paper';
import {setLoginState} from '../redux/actions'

const ProfilScreen = ({navigation}) => {
    const LoginInfo = useSelector(state => state.loginReducer);
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(setLoginState({ isLoggedIn: false,
            userId: ''}))
        navigation.navigate('Home')
        Alert.alert("logged out");
     }
    return (
       
       <SafeAreaView style = {styles.view}>
            {/* Header */}
       <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, marginBottom:20}}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => navigation.navigate('Home')}
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
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Mon Profil</Text>
                  </View>

               </View>
               
            <ScrollView>
            <View style={styles.top}>
                       <Avatar.Image 
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFHi1tfpZag3I3e9LC5L7CzUDaTPuZyHayA&usqp=CAU'
                            }}
                            size={120}
                            style={{alignSelf:'center',backgroundColor:COLORS.white,borderRadius:40}}
                            tintColor = {COLORS.PRIMARY}
                        />
                        <View style={{alignContent:'center',marginTop:8}}>
                            <Title style={styles.titleDrawer}>Bonjour</Title> 
                            <Caption style={styles.caption}>{LoginInfo.userId}</Caption>
                        </View>
                       
            </View>

            <ImageBackground source = {images.ProfilScreen} resizeMode='cover'  style={styles.background_image}></ImageBackground>

            <TouchableOpacity onPress = {() => navigation.navigate('InfoProfil')} >
                 <List.Item
                    title="Mon Profil"
                     left={props => <List.Icon {...props} icon={images.user_icon} />}
                     style={styles.list}
                  />
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => navigation.navigate('MyDefibs')} >
                 <List.Item
                    title="Mes Defibrillateurs"
                     left={props => <List.Icon {...props} icon={images.defib_list_icon} />}
                     style={styles.list}
                  />
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => navigation.navigate('Parametre')} >
                 <List.Item
                    title="Devenir secouriste"
                     left={props => <List.Icon {...props} icon={images.entretenir_icon} />}
                     style={styles.list}
                  />
            </TouchableOpacity>

            <TouchableOpacity onPress = {Logout} >
                 <List.Item
                    title="Deconnexion"
                     left={props => <List.Icon {...props} icon={images.login_icon} />}
                     style={styles.list}
                  />
            </TouchableOpacity>
            </ScrollView>
          
                  
       </SafeAreaView>
    )
}

export default ProfilScreen

const styles = StyleSheet.create({
    top:{
        zIndex:2,
        marginTop:50,
    
    },

    profilContainer : {
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        width:windowWidth*0.85,
        height:windowHeight/2.7,
        marginTop:10,
    },

    // background_image:{
    //     borderRadius : 50
    //   },

    background_image:{
        height:120,
        width:windowWidth,
      },


    view :{
      backgroundColor:COLORS.white,
      flex:1,
    },

    titleDrawer:{
        fontSize: 17,
        fontFamily:'cochin',
        marginTop: 3,
        fontWeight: 'bold',
        letterSpacing:2,
        //color: COLORS.white, 
        alignSelf:'center'
    }, 

    caption:{
        fontSize: 17,
        fontFamily:'cochin',
        marginTop: 3,
        letterSpacing:2,
        //color: COLORS.white, 
        alignSelf:'center'
    }, 

    
    container:{
        display:'flex',
        justifyContent : 'center',
        flexDirection:'row',
    },

    imageContainer:{
        backgroundColor:COLORS.white,
        alignContent:'center',
        justifyContent:'center',
        width:110,
        height:90,
        margin:15,
        shadowColor: "#000",
        shadowOffset: {
	         width: 0,
	         height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14, 
        elevation: 17,
    },

    text:{
        textAlign: 'center',
        fontSize:13,
        letterSpacing:2,
        fontFamily:'cochin',
        fontWeight: 'bold',
        color:COLORS.black,
        margin:5

    },
     
    list : {marginLeft:20, padding:10},
    
     
    })