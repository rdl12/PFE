import React from 'react';
import { View, TouchableOpacity,Image, Alert } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,DrawerItemList
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData} from '../../redux/actions'

import { COLORS, images} from '../../Constantes'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {setLoginState} from '../../redux/actions'

export function SideBar(props) {
 
    const LoginInfo = useSelector(state => state.loginReducer);
    const dispatch = useDispatch()
     const Logout = () => {
        storeData("false")
        dispatch(setLoginState({ isLoggedIn: false, userId: ''}))
        props.navigation.navigate('Home')
        Alert.alert("logged out");
     }
    return (
        <View style={{flex:1,}}>
        <DrawerContentScrollView {...props} >
            <View style={styles.drawerContent}>
                <Drawer.Section style={styles.userInfoSection}>
                   { LoginInfo.isLoggedIn ? ( 
                    <TouchableOpacity style={{flexDirection:'row',marginTop: 10}} onPress={() => props.navigation.navigate('Home')}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://www.clipartmax.com/png/middle/365-3654572_heart-cpr-save-a-life.png'
                            }}
                            size={50}
                        />
                        <View style={{marginLeft:15, flexDirection:'column',marginTop:-8}}>
                            <Title style={styles.titleDrawer}>Bonjour </Title> 
                            <Caption>{LoginInfo.userId}</Caption>
                        </View>
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity style={{flexDirection:'row',marginTop: 10}} onPress={() => props.navigation.navigate('Home')}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://www.clipartmax.com/png/middle/365-3654572_heart-cpr-save-a-life.png'
                            }}
                            size={50}
                        />
                        <View style={{marginLeft:15, flexDirection:'column',marginTop:-8}}>
                            <Title style={styles.titleDrawer}>HearthSave</Title>
                            <Caption style={styles.caption}>L'application qui </Caption>
                            <Caption style={styles.caption}>sauve des vies </Caption>
                        </View>
                    </TouchableOpacity>)}
                </Drawer.Section>

                <Drawer.Section style={styles.drawerSection}>
                         <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>DAE</Title>
                        </View>
                     <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Icon   name="phone" size={20}  
                                    style={{backgroundColor:'red',width: 25,height: 25,borderRadius:50, paddingLeft:5,paddingTop:2,paddingBottom:-5}} 
                                    color="#ffff"   />
                            // <Avatar.Image 
                            // style={{backgroundColor:'red',width: 28,height: 25}}
                            // source={images.phone_icon}
                            // size={25}/> 
                             )}
                        label="Urgence"
                        labelStyle={{color:"#a30000", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('UrgenceScreen')}}
                    /> 
                    <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Icon   name="map-marker" size={20}  
                                    style={{backgroundColor:"#0000CD",width: 25,height: 25,borderRadius:50, paddingLeft:6.5,paddingTop:2,paddingBottom:-5}} 
                                    color="#ffff"   />
                            // <Avatar.Image 
                            // style={{backgroundColor:COLORS.primary,width: 28,height: 25}}
                            // source={images.location_icon}
                            // size={25}/> 
                             )}
                        label="Geolocaliser"
                        labelStyle={{color:"#0000CD", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Maps')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5}}
                        icon={() => (
                            <Icon   name="question" size={15}  
                                    style={{backgroundColor:"#008000",width: 25,height: 25,borderRadius:50, paddingLeft:7.8,paddingTop:4.5,paddingBottom:-5}} 
                                    color="#ffff"   />
                            // <Avatar.Image 
                            // style={{backgroundColor:"#008000",width: 25,height: 25}}
                            // source={images.help_icon}
                            // resizeMode='center' 
                            // size={25}/> 
                             )}
                        label="S.O.S"
                        labelStyle={{color:"#228B22", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Help')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Icon   name="info" size={15}  
                                    style={{backgroundColor:"#FF8C00",width: 25,height: 25,borderRadius:50, paddingLeft:9.8,paddingTop:4.5,paddingBottom:-5}} 
                                    color="#ffff"   />
                            // <Avatar.Image 
                            // style={{backgroundColor:"#FF8C00",width: 25,height: 25,}}
                            // source={images.instruction_menu_icon}
                            // resizeMode='contain' 
                            // size={20}/> 
                             )}
                        label="Instruction"
                        labelStyle={{color:"#D2691E", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Tutorial')}}
                    />
            
                  <DrawerItem 
                  style={{marginBottom:-5,}}
                  icon={() => (
                    <Icon name="plus" size={15}  
                          style={{backgroundColor:"#9932CC",width: 25,height: 25,borderRadius:50, paddingLeft:6.7,paddingTop:5,paddingBottom:-5}} 
                          color="#ffff"   />
                       )}
                  label="Ajouter defib"
                  labelStyle={{color:"#800080", fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20,}}
                  onPress={() => {props.navigation.navigate('MapScreen')}}
              />

              

                </Drawer.Section>

                <Drawer.Section style={styles.drawerSection}>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>Information</Title>
                        </View>
                    <DrawerItem 
                        style={{marginBottom:-5,marginTop:10}}
                        icon={() => (
                             <Icon   name="shopping-basket" size={18}  
                                     style={{backgroundColor:"rgba(0,0,177,0.23)",width: 25,height: 25,borderRadius:50, paddingLeft:2.5,paddingTop:2.5,paddingBottom:-5}} 
                                     color="#0000CD"   />
                            // <Image 
                            //  style={{backgroundColor: 'rgba(0,0,177,0.23)',width: 25,height: 25,borderRadius:50}}
                            //  source={images.product_icon}
                            //  size={25}
                            //  tintColor="#0000CD"/> 
                             )}
                        label="Nos Produit"
                        labelStyle={{color:"#0000CD", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Products')}}
                    />
                       <DrawerItem 
                        style={{marginBottom:-5,marginTop:10}}
                        icon={() => (
                            <Icon   name="medkit" size={20}  
                                    style={{backgroundColor:"rgba(100,0,0,0.18)",width: 25,height: 25,borderRadius:50, paddingLeft:3.3,paddingTop:2,paddingBottom:-5}} 
                                    color="#a30000"   />
                             )}
                        label="Nos defibrillateurs"
                        labelStyle={{color:"#a30000", fontSize:13, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('NosDefib')}}
                    />
                    <DrawerItem
                        style={{marginBottom:-5,}} 
                        icon={() => (
                            <Image 
                            style={{backgroundColor: 'rgba(0,86,0,0.23)',width: 25,height: 25,borderRadius:50}}
                            source={images.formation_icon}
                            size={15}
                            tintColor="#228B22"/> 
                             )}
                        label="Formation"
                        labelStyle={{color:"#228B22", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Formation')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Icon   name="users" size={20}  
                                    style={{backgroundColor:"rgba(197,86,0,0.16)",width: 25,height: 25,borderRadius:50, paddingLeft:2,paddingTop:2,paddingBottom:-5}} 
                                    color="#a30000"   />
                            // <Image 
                            // style={{backgroundColor:"rgba(197,86,0,0.16)",width: 25,height: 25,borderRadius:50}}
                            // source={images.about_us_icon}
                            // size={25}
                            // tintColor="#D2691E"/> 
                             )}
                        label="A propos"
                        labelStyle={{color:"#D2691E", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('AboutScreen')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5}}
                        icon={() => (
                            <Icon   name="bar-chart" size={15}  
                                    style={{backgroundColor:"rgba(74,0,224,0.16)",width: 25,height: 25,borderRadius:50, paddingLeft:4.5,paddingTop:4.5,paddingBottom:-5}} 
                                    color="#800080"   />
                            // <Image 
                            // style={{backgroundColor:"rgba(74,0,224,0.16)",width: 25,height: 25,borderRadius:50}}
                            // source={images.stats_icon}
                            // size={25}
                            // tintColor="#800080"/> 
                             )}
                        label="Statistique"
                        labelStyle={{color:"#800080", fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('StatistiqueScreen')}}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>Compte</Title>
                        </View>
         { LoginInfo.isLoggedIn ?  (<DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:"#ececec",width: 25,height: 25,}}
                            source={images.login_icon}
                            resizeMode='contain' 
                            size={25}/> 
                             )}
                        label="Profil"
                        labelStyle={{ fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Profil')}}
                    />):(<DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:"#ececec",width: 25,height: 25,}}
                            source={images.login_icon}
                            resizeMode='contain' 
                            size={25}/> 
                             )}
                        label="Se Connecter"
                        labelStyle={{ fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Login')}}
                    />)
}
            {LoginInfo.isLoggedIn ? ( <DrawerItem 
                        style={{marginBottom:10,}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:"#ececec",width: 25,height: 25,}}
                            source={images.sign_icon}
                            resizeMode='contain' 
                            size={25}/> 
                             )}
                        label="Logout"
                        labelStyle={{ fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={Logout}
                    />):(<DrawerItem 
                    style={{marginBottom:10,}}
                    icon={() => (
                        <Avatar.Image 
                        style={{backgroundColor:"#ececec",width: 25,height: 25,}}
                        source={images.sign_icon}
                        resizeMode='contain' 
                        size={25}/> 
                         )}
                    label="S'inscrire"
                    labelStyle={{ fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                    onPress={() => {props.navigation.navigate("Sign up")}}
                />)}

        </Drawer.Section>
              
            </View>

        </DrawerContentScrollView>
        
        
   
    </View>)
     
}

export default SideBar
