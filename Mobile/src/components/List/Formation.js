import React, { useEffect } from 'react';
import {
  Pressable, View, Image, StyleSheet,Text
} from 'react-native';







// Single book component
function Formation({ formation, navigation }) {
  
  const margin = 20;
  const BOOKW = 170;
  const BOOKH = BOOKW * 1.25;
 


  // View book details
const formationDetails = () => {

  navigation.push('formationDetails', { formation });
};

 // Styles
 const styles = StyleSheet.create({
  imgBox: {
    marginRight: margin,
    borderRadius: 10,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
  },
  bookImg: {
    width: BOOKW,
    height: BOOKH,
    borderRadius: 10,
  },
  bookText: {
    marginRight: margin,
    marginTop: margin / 2,
    width:BOOKW
  },
});
  // Animated styles
  

 
  return (
    <Pressable onPress = {formationDetails} >
      <View >
       
          <View style={styles.imgBox}>
            <Image style={styles.bookImg} source={{ uri: formation.image }} />
          </View>
 
        <Text  style={styles.bookText}>
          {formation.nom}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(Formation);


