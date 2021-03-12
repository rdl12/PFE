import React from 'react'
import { StyleSheet, Text, View,Image, SafeAreaView,Button } from 'react-native'
import { images} from "../Constantes"

export default function Header({ title, navigation,onPress }) {
    const openMenu = () => {
        navigation.openDrawer();
      }
    
      return (
        <SafeAreaView style={styles.header}>
        <Image
                source={images.menu_icon}
                style={{
                    width: 30,
                    height: 30  
                }}
             />  
          <View>
            <Text style={styles.headerText}>{title}</Text>
          </View>

          {title = 'ajouter un defibrilateur' ? (<Button
              onPress={onPress}
              title="Envoyer"
               />)
              :null}
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({ 
    header: {
    width: '100%',
    height:60,
    zIndex:1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#3D61E1',
    justifyContent: 'space-evenly',
    
    top: 0,
    
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffff',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
    color:"#ffff"
  }
})
