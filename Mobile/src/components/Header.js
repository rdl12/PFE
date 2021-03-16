import React from 'react'
import { StyleSheet, Text, View,Image, SafeAreaView,Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS,images,FONTS} from "../Constantes"
import {windowHeight} from '../utils/Dimentions'

export default function Header({ title, navigation,Submit,onPress ,isRetour}) {
    
      return (
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress =  {onPress} style = {{  elevation:2,}} >
         {!isRetour ? (<Image
                  source={images.menu_icon}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.white 
                }}
              />) : <Image
              source={images.back_arrow}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.white
            }}  />  }  
          </TouchableOpacity>
     
          <View>
            <Text style={styles.headerText}>{title}</Text>
          </View>

          {title = 'ajouter un defibrilateur' ? (<Button
              onPress={Submit}
              title="Envoyer"
                />)
              :null}
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({ 
    header: {
    width: '100%',
    height: windowHeight/12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex:100,
    top: 0,
    //position:'absolute',
    elevation:2,
    backgroundColor: COLORS.primary
    
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: FONTS.h1.fontFamily,
    color: COLORS.white,
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
    elevation:2,
  }
})
