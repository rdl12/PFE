import React, { useEffect } from 'react';
import {
  Pressable, View, Image, StyleSheet,Text
} from 'react-native';







// Single book component
function Formation({ formation, index }) {
  
  const margin = 30;
  const BOOKW = 100;
  const BOOKH = BOOKW * 1.5;
 


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
  },
});
  // Animated styles
  

 
  return (
    <Pressable >
      <View >
       
          <View style={styles.imgBox}>
            <Image style={styles.bookImg} source={{ uri: formation.imageUrl }} />
          </View>
 
        <Text  style={styles.bookText}>
          {formation.author.name}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(Formation);


