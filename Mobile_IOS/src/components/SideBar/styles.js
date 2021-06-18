import { StyleSheet } from "react-native";
import { COLORS } from "../../Constantes";


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    titleDrawer:{
      fontSize: 13,
      marginTop: 3,
      fontWeight: 'bold',
      letterSpacing:1,
      color: COLORS.black
    
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 13,
      marginTop: 3,
      fontWeight: 'bold',
      letterSpacing:1,
      color: COLORS.darkgray
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 10,
    },
    bottomDrawerSection: {
        marginBottom: 5,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  export default styles;