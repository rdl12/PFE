import { COLORS, Colors, icons,images} from '../../Constantes'
import { StyleSheet } from "react-native";
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import { withTheme } from 'react-native-paper';

const styles = StyleSheet.create({
   container:
   {
     marginTop:"10%",
     marginRight:10,
     backgroundColor:'white',
     alignSelf:'center',
     height: windowHeight / 4,
     width: '87%',
     borderRadius:40,
     
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 7,
     },
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
     
     elevation: 15,
    
   },

   cardHeader :{
       margin:20,
       flexDirection: 'row',
       justifyContent:'space-between',
       borderBottomColor:'black',
       borderBottomWidth:0.25
    
       
   },
   textHeader:{
     fontSize:15,
   },


   add_to_photo:{
       height:100 ,
       width:100,
      marginLeft:15,
      bottom:10,
      
     
     
   }
});

export default styles;