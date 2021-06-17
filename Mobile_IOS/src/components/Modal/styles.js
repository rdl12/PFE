import { StyleSheet } from "react-native";
import { COLORS } from "../../Constantes";

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0,0,0,0.5)',
     
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding:15,
      paddingTop:10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      marginTop:10,
      width:80,
      left:70,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    textStyle: {
      fontSize:15,
      fontFamily:'cochin',
      color: COLORS.primary,
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    text:{fontSize:18, fontFamily:'cochin'},
    
    Header:{
        width:'114%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:COLORS.primary,
        marginTop: -10,
        marginBottom:15,
        marginRight : -15,
        marginLeft:-15,
        paddingTop:20,
        paddingBottom:20,
        padding: 30,
    }, 

    TextHeader:{
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing:1,
      color: COLORS.white
    
    },
  });

  export default styles;