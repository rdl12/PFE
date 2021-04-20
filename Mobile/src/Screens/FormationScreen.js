import React, { useState, useEffect } from 'react';
import { View, ScrollView,StyleSheet } from 'react-native';

import List from '../components/List/FormationList';

const FormationScreen = ({navigation}) => {
  const [reading, setReading] = useState(
    [{
    id:'1',
    author:{
      name:'name'
    }},
    {
      id:'2',
      author:{
        name:'name'
      }
    },
    {
      id:'3',
      author:{
        name:'name'
    }
  },
  {
    id:'4',
    author:{
      name:'name'
  }
},
]);
  const [completed, setCompleted] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const styles = StyleSheet.create ({
    screen: {
      flex: 1,
     
    },
  });


    return (
    <View style={styles.screen}>
      <ScrollView
      >
        <List formations={reading} title="Reading" navigation={navigation} />
        <List formations={completed} title="Completed" navigation={navigation} />
        <List formations={wishlist} title="Wishlist" navigation={navigation} />
      </ScrollView>
    </View>
    )
}

export default FormationScreen

