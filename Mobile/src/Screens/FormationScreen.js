import React, { useState, useEffect } from 'react';
import { View, ScrollView,StyleSheet } from 'react-native';
import {useSelector} from 'react-redux'

import List from '../components/List/FormationList';

const FormationScreen = ({navigation}) => {
  const formation = useSelector(state => state.Formation_Reducer.formation);
   
  let secourisme = formation.filter(
    (formation) => formation.categorie.nom === 'secourisme' 
  );
  let Mannequin  = formation.filter(
    (formation) => formation.categorie.nom === 'Mannequin formation' 
  );
  

    return (
    <View style={styles.screen}>
      <ScrollView
      >
        <List formations={secourisme} title="Secourisme" navigation={navigation} />
        <List formations={Mannequin} title="Mannequin formation" navigation={navigation} />

      </ScrollView>
    </View>
    )
}

export default FormationScreen

const styles = StyleSheet.create ({
    screen: {
      flex: 2,
     
    },
  });