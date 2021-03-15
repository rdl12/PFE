import React from 'react'
import { StyleSheet, Text, View,Image, SafeAreaView,Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { images} from "../Constantes"
import {windowHeight} from '../utils/Dimentions'

export default function Header({ title, navigation,Submit,onPress ,isRetour}) {
    const openMenu = () => {
        navigation.openDrawer();
      }
    
      return (
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress = {() => {onPress}  }>
         {!isRetour ? (<Image
                  source={images.menu_icon}
                  style={{
                      width: 30,
                      height: 30  
                  }}
              />) : <Image
              source={images.back_arrow}
              style={{
                  width: 30,
                  height: 30  
              }}  />  }  
          </TouchableOpacity>
     
          <View>
            <Text style={styles.headerText}>{title}</Text>
          </View>

          {title = 'ajouter un defibrilateur' ? (<Button
              onPress={Submit}
              title="Envoyer"
              color="#841584" />)
              :null}
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({ 
    header: {
    width: '100%',
    height: windowHeight/10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex:100,
    top: 0,
    
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  }
})
