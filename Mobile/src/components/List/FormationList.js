import React from 'react';
import {
  View, StyleSheet, FlatList, Pressable,Text
} from 'react-native';

import Formation from './Formation';


// Horizontal list of books
function FormationList({ formations, title }) {
    
  const margin = 30;
  const width = 80

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
        <Text >{title}</Text>
        <Text >{formations.length}</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={formations}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) => (
          <Formation formation={item} index={index}   />
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
}

export default React.memo(FormationList);

