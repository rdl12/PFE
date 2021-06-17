import React from 'react';
import {
  View, StyleSheet, FlatList, Pressable,Text
} from 'react-native';

import Formation from './Formation';


// Horizontal list of books
function FormationList({ formations, title,navigation,BOOKH,BOOKW, products }) {
    
  const margin = 20;
  const width = 400

  // Handle horizontal scroll
  

 
  // All styles
const styles = StyleSheet.create({
    list: {
      backgroundColor: 'white',
      paddingTop: (title === 'Reading' ? margin : 0),
    },
    heading: {
      paddingTop: margin,
      paddingHorizontal: margin,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listContainer: {
      padding: margin,
    },
    emptyContainer: {
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: width - margin * 2,
      paddingVertical: margin * 2,
      backgroundColor: 'grey',
    },
    emptyText: {
      padding: margin,
    },
    title:{
      fontWeight:'bold',
      fontSize:17,
      fontFamily:'cochin',

    }
  });

  // Empty list placeholder
  const EmptyList = () => (
    <Pressable  style={styles.emptyContainer}>
      <Text  style={styles.emptyText}>
        Null
      </Text>
    </Pressable>
  );

  // Render book list
  return (
    <View style={styles.list}>
      <View style={styles.heading}>
        <Text style = {styles.title} >{title}</Text>
        <Text >{formations.length}</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={formations}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <Formation formation={item} navigation={navigation} BOOKH ={BOOKH} BOOKW = {BOOKW} products = {products}   />
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
}

export default React.memo(FormationList);

