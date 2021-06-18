import { COLORS, Colors, icons,images,FONTS} from '../../Constantes'
import { StyleSheet } from "react-native";
import {windowHeight, windowWidth} from '../../utils/Dimentions';

const styles = StyleSheet.create({
    list: {
      backgroundColor: 'grey',
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
      backgroundColor: 'red',
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

export default styles;