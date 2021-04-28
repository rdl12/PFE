import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import {useSelector} from 'react-redux'
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,DrawerItemList
} from '@react-navigation/drawer';

import { COLORS, images} from '../../Constantes'
import styles from './styles'

export function SideBar(props) {
 
    const LoginInfo = useSelector(state => state.loginReducer);
   
    return (
        <View style={{flex:1,}}>
        <DrawerContentScrollView {...props} >
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                   { LoginInfo.isLoggedIn ? ( <View style={{flexDirection:'row',marginTop: 10}}>
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
                    </View>) : ( <View style={{flexDirection:'row',marginTop: 10}}>
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
                    </View>)}
                </View>

                <Drawer.Section style={styles.drawerSection}>
                         <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>DAE</Title>
                        </View>
                     <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:'red',width: 28,height: 25}}
                            source={images.phone_icon}
                            size={25}/> 
                             )}
                        label="Urgence"
                        labelStyle={{color:"#a30000", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('UrgenceScreen')}}
                    /> 
                    <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:COLORS.primary,width: 28,height: 25}}
                            source={images.location_icon}
                            size={25}/> 
                             )}
                        label="Geolocaliser"
                        labelStyle={{color:"#0000CD", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Maps')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:"#008000",width: 25,height: 25}}
                            source={images.help_icon}
                            resizeMode='center' 
                            size={25}/> 
                             )}
                        label="Help"
                        labelStyle={{color:"#228B22", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('AddDefib')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5,}}
                        icon={() => (
                            <Avatar.Image 
                            style={{backgroundColor:"#FF8C00",width: 25,height: 25,}}
                            source={images.instruction_menu_icon}
                            resizeMode='contain' 
                            size={25}/> 
                             )}
                        label="Instruction"
                        labelStyle={{color:"#D2691E", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                    />
             { LoginInfo.isLoggedIn ?  (
                  <DrawerItem 
                  style={{marginBottom:-5,}}
                  icon={() => (
                      <Avatar.Image 
                      style={{backgroundColor:"#9932CC",width: 25,height: 25,}}
                      source={images.signaler_icon}
                      resizeMode='contain' 
                      size={25}/> 
                       )}
                  label="Signaler"
                  labelStyle={{color:"#800080", fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                  onPress={() => {props.navigation.navigate('MapScreen')}}
              />

              
             ):null}
                </Drawer.Section>

                <Drawer.Section style={styles.drawerSection}>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>Information</Title>
                        </View>
                    <DrawerItem 
                        style={{marginBottom:-5,marginTop:10}}
                        icon={() => (
                            <Image 
                            style={{backgroundColor: 'rgba(0,0,177,0.23)',width: 25,height: 25,borderRadius:50}}
                            source={images.product_icon}
                            size={25}
                            tintColor="#0000CD"/> 
                             )}
                        label="Nos Produit"
                        labelStyle={{color:"#0000CD", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Maps')}}
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
                            <Image 
                            style={{backgroundColor:"rgba(197,86,0,0.16)",width: 25,height: 25,borderRadius:50}}
                            source={images.about_us_icon}
                            size={25}
                            tintColor="#D2691E"/> 
                             )}
                        label="A propos"
                        labelStyle={{color:"#D2691E", fontSize:15, fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                    />
                    <DrawerItem 
                        style={{marginBottom:-5}}
                        icon={() => (
                            <Image 
                            style={{backgroundColor:"rgba(74,0,224,0.16)",width: 25,height: 25,borderRadius:50}}
                            source={images.stats_icon}
                            size={25}
                            tintColor="#800080"/> 
                             )}
                        label="Statistique"
                        labelStyle={{color:"#800080", fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('SettingsScreen')}}
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
                        label="Profile"
                        labelStyle={{ fontSize:15,  fontFamily:'cochin', fontWeight: "bold",right:20}}
                        onPress={() => {props.navigation.navigate('Profile')}}
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
                        onPress={() => {props.navigation.navigate('Se Connecter')}}
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
                        onPress={() => {props.navigation.navigate("")}}
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
                    onPress={() => {props.navigation.navigate("")}}
                />)}

        </Drawer.Section>
              
            </View>

        </DrawerContentScrollView>
        
        
   
    </View>)
     
}

export default SideBar
