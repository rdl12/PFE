import React, { useEffect,useState } from 'react'
import { View,Text,StyleSheet,Image} from 'react-native'
import {Avatar,Title,Caption,List,Switch } from 'react-native-paper';
import { COLORS, Colors, icons,images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import useBackgroundGeolocationTracker from '../components/BgTracking';
import Icon from 'react-native-vector-icons/FontAwesome';

const parametre = () => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [IsEnabeld, setIsEnabeld] = useState(false)
    const location = useBackgroundGeolocationTracker(IsEnabeld); 
  
  
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        setIsEnabeld(!IsEnabeld)
        
    };

    return (
        <View style={styles.screen}>
            <View style={styles.box}>
            <View>
                    <Text style={{ fontWeight:'600',fontSize:16,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Notre application sauve des vies et vous permet de sauver des vies a l'aide de sa fonction :  </Text>
                    <Text style={{ fontWeight:'bold',fontSize:19,color: COLORS.red,alignSelf:'center' }}>"Devenir secouriste"  </Text>
                    <Text style={{ fontWeight:'600',fontSize:16,color: COLORS.BLACK,margin:20,marginLeft:30 }}>"Devenir secouriste" est une option qui vous permet de recevoir des notification des gens en tours de vous et qui ont besoin de vous lors d'un crise cardiaque, toute en securité totale votre position ne sera en aucun cas stocké par sur nos serveurs ni accaessible par notre equipe. (seule la localisation e la victime qui seront stocké pendant une duré de 5 min puis totlement supprimé)  </Text>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                        <Icon name="heartbeat" size={50}  color={COLORS.red} style={{margin:5}} /> 
                        <Icon name="heart" size={50} color={COLORS.BLACK} style={{margin:5}}  /> 
                        <Icon name="heartbeat" size={50} color={COLORS.red} style={{margin:5}} /> 
                    </View>
                    
                    <Text style={{ fontWeight:'600',fontSize:16,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Pour devenir secouriste vous pouvez simplement activer la fonction ci dessous pour pouvoir recevoir des notification de demande d'aide, puis aller sur vos parametre de localisation et recativer la precision google, vous pouvez desactiver la fonction "Devenir secouriste" quand vous voulez </Text> 
                    <Text style={{fontWeight:'600',fontSize:16,color: COLORS.BLACK,margin:20,marginLeft:30 }}>Ps : N'hesiter pas de viditer notre onglet formation, nous offrons des formation de secourisme pour vous, votre familles, vos employées</Text> 
           
             </View>
             
                    
                   
                    
      </View>
            <List.Item
                title="Devenir secouriste"
                left={props => <List.Icon {...props} icon={images.location_icon} color={COLORS.black}/>}
                right={props => <Switch value={isSwitchOn} onValueChange={onToggleSwitch}  /> }
                style={{ padding:10, borderBottomWidth:0.5}}
                titleStyle={{fontSize:17, letterSpacing:1.5}}
            />
        </View>
    )
}

export default parametre

const styles = StyleSheet.create({
    box:{
        height:windowHeight/1.3,
        backgroundColor:COLORS.lightGray4,
        elevation:2,
        borderBottomRightRadius:100
        
      
      },
    screen: {
        flex: 1,
       backgroundColor:COLORS.white
      },
})
