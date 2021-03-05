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
              color="#841584" />)
              :null}
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({ 
    header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
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
